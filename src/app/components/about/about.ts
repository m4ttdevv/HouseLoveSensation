import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SearchServiceBar } from '../../search-service';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-about',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {
  constructor(private searchServiceBar: SearchServiceBar) {}

  ngOnInit(): void {
    this.searchServiceBar.addPageContent({
      route: '/about',
      title: 'Chi siamo',
      sections: [
        {
          title: 'Su di noi',
          content: 'Organizzare, Esperienza, obiettivo, chi siamo, professionisti,',
          keywords: ["chi siamo"]
        }
        // Aggiungi altre sezioni...
      ]
    });
  }
} {

}
