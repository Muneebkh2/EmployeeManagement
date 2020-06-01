import { Component, OnInit } from '@angular/core';
import { TokenManagerService } from 'src/app/services/token-manager.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public token: TokenManagerService) { }

  ngOnInit(): void {
  }

  logout() {
    this.token.logout()
  }

}
