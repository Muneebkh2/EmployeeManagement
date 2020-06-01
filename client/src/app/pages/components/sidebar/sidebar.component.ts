import { Component, OnInit } from '@angular/core';
import { TokenManagerService } from 'src/app/services/token-manager.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public token: TokenManagerService) { }

  ngOnInit(): void {
  }

}
