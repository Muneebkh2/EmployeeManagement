import { Component, OnInit } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { RestService } from 'src/app/services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  allEmployees: any;
  isVisible: boolean = false;
  empObje: any;
  spinner: boolean = false

  updatePassword
  updateCPassword
  updateEmail
  updateName
  
  constructor(private api: RestService, private displayError: NzNotificationService, private route: ActivatedRoute, private router: Router) { }
  empID = this.route.snapshot.paramMap.get('ID');

  ngOnInit() {
    this.get_Employees();
  }

  get_Employees() {
    this.api.getAllEmployees().subscribe((res: any) => {
      this.allEmployees = res;

      let admin = this.allEmployees.filter(el => {
        return el.id == this.empID
      })
      this.empObje = admin

      // this.updateName = this.adminObj[0].name
      // this.updateEmail = this.adminObj[0].email
    }, (err: any) => {
      this.displayError.create(
        'error', 'Error', err.error.message,
        { nzDuration: 6500 }
      );
    })
  }


  updateEmployee(value, id) {
    this.spinner = true;  // progressing flag
    // // formData body
    let body = {
      // name: this.updateName,
      // email: this.updateEmail,
      // password: this.updatePassword,
      // confirm_password: this.updateCPassword
    };
    console.log(body)
    // send request to server.
    this.api.updateEmployee(this.empID, body).subscribe(
      (res: any) => {
        this.spinner = false; // progressing flag
        this.router.navigate(['/all-employees/']);
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
