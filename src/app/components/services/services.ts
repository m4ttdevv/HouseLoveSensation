import { Component } from '@angular/core';
import { SearchServiceBar } from '../../search-service';
import { OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [RouterLink, RouterModule, RouterLinkActive],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit {
  
  constructor(private searchServiceBar: SearchServiceBar) {}

  ngOnInit(): void {
    this.searchServiceBar.addPageContent({
      route: '/services',
      title: 'Servizi',
      sections: [
        {
          title: 'Pacchetti',
          content: 'Pacchetti, servizi',
          keywords: []
        }
        // Aggiungi altre sezioni...
      ]
    });
  }
} {

}
