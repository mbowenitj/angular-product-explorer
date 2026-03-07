import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faPlusCircle,
  faBox,
  faUsers,
  faChartBar,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule], 
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private router: Router) {}
  
   // Icons
  faPlusCircle = faPlusCircle;
  faBox = faBox;
  faUsers = faUsers;
  faChartBar = faChartBar;
  faSignOutAlt = faSignOutAlt;
  
  logout(): void {
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/']);
  }
}