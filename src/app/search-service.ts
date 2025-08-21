// search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

//rappresenta un singolo risultato di ricerca
export interface SearchResult {
  title: string; //titolo pagina
  content: string; //contenuto della sezione
  route: string; //percorso di nagivazione
  section?: string; //nome della sezione
}

//definisce la struttura di una pagina con le sue sezioni
export interface PageContent {
  route: string; //percorso della pagina
  title: string; //titolo pagina
  sections: { //array delle sezioni
    title: string; //titolo sezione
    content: string; //contenuto della sezione
    keywords: string[]; //parola chiave per la ricerca
  }[];
}

@Injectable({
  providedIn: 'root'
})

export class SearchServiceBar {
  private searchResults = new BehaviorSubject<SearchResult[]>([]); //Stream dei risultati di ricerca
  private searchQuery = new BehaviorSubject<string>(''); //stream della query di ricerca corrente

  // Database delle pagine e dei loro contenuti
  private pagesContent: PageContent[] = [
    {
      route: '/home',
      title: 'Home',
      sections: [
        {
          title: 'Benvenuti',
          content: 'Benvenuto sulla nostra homepage',
          keywords: ['benvenuti', 'welcome', 'casa', 'home', 'musica', 'music', 'house']
        },
      ]
    },
    {
      route: '/about',
      title: 'Chi siamo',
      sections: [
        {
          title: 'La nostra storia',
          content: 'Professioniti da 10 anni nel nostro settore',
          keywords: ['storia', 'history', 'esperienza', 'experience']
        },
        {
          title: 'Il nostro team',
          content: 'Un team di professionisti dedicati alla musica e agli eventi',
          keywords: ['team', 'professionisti', 'professionals', 'staff', 'membri', 'members']
        }
      ]
    },
    {
      route: '/services',
      title: 'Servizi',
      sections: [
        {
          title: 'Pacchetti',
          content: 'Offriamo servizi di DJ per eventi e feste private',
          keywords: ['dj', 'set', 'eventi', 'events', 'feste', 'party', 'private', 'musica','pacchetti','esclusivi','promozioni']
        },
      ]
    },
    {
      route: '/contact',
      title: 'Contatti',
      sections: [
        {
          title: 'Informazioni di contatto',
          content: 'Contattaci per maggiori informazioni sui nostri servizi',
          keywords: ['contatti', 'contact', 'telefono', 'phone', 'email', 'informazioni', 'info', 'numero']
        }
      ]
    }
  ];

  constructor(private router: Router) {}

  // Metodo per eseguire la ricerca
  search(query: string): SearchResult[] { //esegue la ricerca attraverso tutte le pagine
    if (!query || query.trim().length < 2) { //Algoritmo di ricerca, ignora le query vuote con o meno di due caratteri
      return [];
    }
    //cerca in tre aree per ogni sezione
    const searchTerm = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    this.pagesContent.forEach(page => {
      page.sections.forEach(section => {
        // Cerca nelle keywords
        const keywordMatch = section.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm)
        );

        // Cerca nel contenuto
        const contentMatch = section.content.toLowerCase().includes(searchTerm);

        // Cerca nel titolo
        const titleMatch = section.title.toLowerCase().includes(searchTerm);
            //restituisce tutti i risultati se soddisfa almeno un criterio e ritorna array di SearchResult (sotto)
        if (keywordMatch || contentMatch || titleMatch) {
          results.push({
            title: page.title,
            content: section.content,
            route: page.route,
            section: section.title
          });
        }
      });
    });

    this.searchResults.next(results);
    return results;
  }

  // Observable per i risultati di ricerca
  getSearchResults(): Observable<SearchResult[]> {
    return this.searchResults.asObservable(); //restituisce un observable per monitorare i cambiamenti nei risultati di ricerca
  }

  // Observable per la query di ricerca
  getSearchQuery(): Observable<string> {
    return this.searchQuery.asObservable(); //restituisce un observable per monitorare la query di ricerca corrente
  }

  // Aggiorna la query di ricerca corrente nell'observable stream
  updateSearchQuery(query: string): void {
    this.searchQuery.next(query);
  }

  // Naviga verso una pagina specifica usando angular router
  navigateToResult(route: string): void {
    this.router.navigate([route]);
  }

  // Metodo per aggiungere contenuti di nuove pagine, se esiste già nello stesso route la sovrascrive 
  addPageContent(pageContent: PageContent): void {
    const existingIndex = this.pagesContent.findIndex(page => page.route === pageContent.route);
    if (existingIndex !== -1) {
      this.pagesContent[existingIndex] = pageContent;
    } else {
      this.pagesContent.push(pageContent); //altrimenti aggiunge una nuova pagina
    }
  }

  // Pulisce i risultati di ricerca
  clearSearchResults(): void {
    this.searchResults.next([]);
    this.searchQuery.next('');
  }
}
