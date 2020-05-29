import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(value) {
    if (value.viewModel == "admin@admin.com") {
      this.router.navigate(['/dashboard'])
    } else if (value.viewModel == "aman@employee.com") {
      this.router.navigate(['/employee-profile'])
    }
  }

}
