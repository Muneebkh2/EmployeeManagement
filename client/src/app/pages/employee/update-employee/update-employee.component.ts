import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
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

  updateName
  updateEmail
  updatePhone
  updateAddress
  updateDesignation

  constructor(private api: RestService, private displayError: NzNotificationService, private route: ActivatedRoute, private router: Router) { }
  empID = this.route.snapshot.paramMap.get('ID');

  ngOnInit() {
    this.get_Employees();
  }

  get_Employees() {
    this.api.getAllEmployees().subscribe((res: any) => {
      this.allEmployees = res;
      console.log(this.allEmployees)
      let emp = this.allEmployees.filter(el => {
        return el.id == this.empID
      })
      this.empObje = emp

      this.updateName = this.empObje[0].users.name
      this.updateEmail = this.empObje[0].users.email
      this.updatePhone = this.empObje[0].phone
      this.updateAddress = this.empObje[0].address
      this.updateDesignation = this.empObje[0].designation
      // this.updatePassword = this.empObje[0].users.password
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
      name: this.updateName,
      email: this.updateEmail,
      phone: this.updatePhone,
      address: this.updateAddress,
      designation: this.updateDesignation
    };
    console.log(body)
    // send request to server.
    this.api.updateEmployee(this.empObje[0].user_id, body).subscribe(
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
