import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { SearchServiceBar } from '../../search-service';

@Component({
  selector: 'app-home',
  imports: [RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  constructor(private searchServiceBar: SearchServiceBar) {}

  ngOnInit(): void {
    this.searchServiceBar.addPageContent({
      route: '/home',
      title: 'Home',
      sections: [
        {
          title: 'Benvenuti',
          content: 'Homepage di presentazione',
          keywords: ['home', 'benvenuti', 'house', 'sensation', 'festa']
        }
        // Aggiungi altre sezioni...
      ]
    });
  }
} {

}
