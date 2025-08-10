// search.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchServiceBar, SearchResult  } from '../../search-service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <!-- Barra di ricerca -->
      <form class="d-flex" (ngSubmit)="onSearch()">
        <input 
          class="form-control me-2 rounded-pill" 
          type="search" 
          placeholder="Cerca..." 
          aria-label="Search"
          [(ngModel)]="searchQuery"
          (input)="onInputChange($event)"
          name="search"
          autocomplete="off">
        <button class="btn btn-outline-success rounded-pill" type="submit">
          Cerca
        </button>
      </form>

      <!-- Risultati di ricerca -->
      @if (searchResults.length > 0 || (searchQuery && searchResults.length === 0)) {
        <div class="search-results">
          <div class="results-container">
            <div class="results-header">
              <h6>Risultati di ricerca per: "{{ searchQuery }}"</h6>
              <button class="btn btn-sm btn-outline-secondary" (click)="clearSearch()">
                ×
              </button>
            </div>
            
            @if (searchResults.length === 0 && searchQuery) {
              <div class="no-results">
                <p>Nessun risultato trovato.</p>
              </div>
            }
            
            @for (result of searchResults; track result.route) {
              <div class="result-item" (click)="navigateToResult(result)">
                <div class="result-header">
                  <strong>{{ result.title }}</strong>
                  @if (result.section) {
                    <span class="result-section">- {{ result.section }}</span>
                  }
                </div>
                <p class="result-content">{{ result.content }}</p>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .search-container {
      position: relative;
    }

    .search-results {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 1000;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-height: 400px;
      overflow-y: auto;
      margin-top: 5px;
    }

    .results-container {
      padding: 15px;
    }

    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }

    .results-header h6 {
      margin: 0;
      color: #333;
    }

    .result-item {
      padding: 10px;
      margin-bottom: 8px;
      border: 1px solid #f0f0f0;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .result-item:hover {
      background-color: #f8f9fa;
      border-color: #007bff;
    }

    .result-header {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
    }

    .result-section {
      color: #6c757d;
      font-size: 0.9em;
      margin-left: 5px;
    }

    .result-content {
      margin: 0;
      color: #666;
      font-size: 0.9em;
      line-height: 1.4;
    }

    .no-results {
      text-align: center;
      color: #6c757d;
      padding: 20px;
    }

    .btn-outline-success {
      border-color: #28a745;
      color: #28a745;
    }

    .btn-outline-success:hover {
      background-color: #28a745;
      color: white;
    }

    @media (max-width: 768px) {
      .search-results {
        position: fixed;
        top: 60px;
        left: 10px;
        right: 10px;
        max-height: 70vh;
      }
    }
  `]
})
export class SearchComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  searchResults: SearchResult[] = [];
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(private searchServiceBar: SearchServiceBar) {}

  ngOnInit(): void {
    // Sottoscrizione ai risultati di ricerca
    this.searchServiceBar.getSearchResults()
      .pipe(takeUntil(this.destroy$))
      .subscribe(results => {
        this.searchResults = results;
      });

    // Debounce per la ricerca automatica durante la digitazione
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(query => {
        this.performSearch(query);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInputChange(event: any): void {
    const query = event.target.value;
    this.searchQuery = query;
    this.searchSubject.next(query);
  }

  onSearch(): void {
    this.performSearch(this.searchQuery);
  }

  private performSearch(query: string): void {
    if (query && query.trim().length >= 2) {
      this.searchServiceBar.search(query);
      this.searchServiceBar.updateSearchQuery(query);
    } else {
      this.clearSearch();
    }
  }

  navigateToResult(result: SearchResult): void {
    this.searchServiceBar.navigateToResult(result.route);
    this.clearSearch();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.searchServiceBar.clearSearchResults();
  }
}