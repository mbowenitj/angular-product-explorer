import { Component, OnInit } from '@angular/core';
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
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) {}

  faPlusCircle = faPlusCircle;
  faBox = faBox;
  faUsers = faUsers;
  faChartBar = faChartBar;
  faSignOutAlt = faSignOutAlt;

  ngOnInit(): void {

    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!isAdmin) {
      this.router.navigate(['/']);
    }

  }

  logout(): void {
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/']);
  }

}