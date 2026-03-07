import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faFaceFrown,
  faHome,
  faSearch,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, CommonModule, FontAwesomeModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  // Icons
  faFaceFrown = faFaceFrown;
  faHome = faHome;
  faSearch = faSearch;
  faArrowLeft = faArrowLeft;
  
  constructor(private location: Location) {}
  
  goBack(): void {
    this.location.back();
  }
}