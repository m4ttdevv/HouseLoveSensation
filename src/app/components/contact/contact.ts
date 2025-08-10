import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SearchServiceBar } from '../../search-service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit {
  constructor(private searchServiceBar: SearchServiceBar) {}

  ngOnInit(): void {
    this.searchServiceBar.addPageContent({
      route: '/contact',
      title: 'Contatti',
      sections: [
        {
          title: 'Contatti',
          content: 'Contattaci!',
          keywords: []
        }
        // Aggiungi altre sezioni...
      ]
    });
  }
} {

}
