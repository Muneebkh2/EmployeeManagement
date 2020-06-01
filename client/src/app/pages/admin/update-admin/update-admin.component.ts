import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
  getAdmin: any;
  adminObj: any;
  spinner = false
  constructor(private api: RestService, private displayError: NzNotificationService, private route: ActivatedRoute, private router: Router) { }
  adminID = this.route.snapshot.paramMap.get('ID');
  updatePassword
  updateCPassword
  updateEmail
  updateName
  
  ngOnInit(): void {
    this.getAllAdmin()
  }

  getAllAdmin() {
    this.api.getAllAdmins().subscribe((res: any) => {
      this.getAdmin = res;

      let admin = this.getAdmin.filter(el => {
        return el.id == this.adminID
      })
      this.adminObj = admin

      this.updateName = this.adminObj[0].name
      this.updateEmail = this.adminObj[0].email
    }, (err: any) => {
      this.displayError.create(
        'error', 'Error', err.error.message,
        { nzDuration: 6500 }
      );
    })
  }

  updateAdmin(value, id) {
    this.spinner = true;  // progressing flag
    // // formData body
    let body = {
      name: this.updateName,
      email: this.updateEmail,
      password: this.updatePassword,
      confirm_password: this.updateCPassword
    };
    console.log(body)
    // send request to server.
    this.api.updateAdmin(this.adminID, body).subscribe(
      (res: any) => {
        this.spinner = false; // progressing flag
        this.router.navigate(['/all-admins/']);
        this.displayError.create(
          'success', 'Success', res.message,
          { nzDuration: 6500 }
        );
      },
      (err: any) => {
        this.spinner = false; // progressing flag
        this.displayError.create(
          'error', 'Error', err.error.message,
          { nzDuration: 6500 }
        );
      }
    );
  }

}
