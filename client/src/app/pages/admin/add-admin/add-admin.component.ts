import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  spinner: boolean;
  // form models
  name
  email
  Password
  cPassword
  constructor(private api: RestService, private router: Router, private displayError: NzNotificationService) { }

  ngOnInit(): void {
  }

  addAdmin(adminData) {
    this.spinner = true;

    let body = {
      name: adminData.userName,
      email: adminData.userEmail,
      password: adminData.password,
      confirm_password: adminData.confirmPassword
    };
    this.api.createAdmin(body).subscribe((res: any) => {
      this.spinner = false;
      this.router.navigate(['/all-admins']);
      this.displayError.create(
        'success', 'Success', res.message,
        { nzDuration: 4500 }
      );
    },
      (err: any) => {
        this.spinner = false;
        this.displayError.create(
          'error', 'Error', err.error.email,
          { nzDuration: 6500 }
        );
      })
  }


}
