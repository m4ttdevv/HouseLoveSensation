import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchComponent } from "../search/search";
import { SearchServiceBar } from '../../search-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, SearchComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  
}