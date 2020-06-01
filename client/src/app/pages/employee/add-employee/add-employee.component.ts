import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
    spinner: boolean = false;

    name
    email
    phone
    address
    designation
    password
    constructor(private api: RestService, private displayError: NzNotificationService, private router: Router) { }

    ngOnInit(): void {
    }

    addEmployee(employeeData) {
        this.spinner = true;

        let body = {
            name: employeeData.empName,
            email: employeeData.empEmail,
            phone: employeeData.empPhone,
            address: employeeData.empAddress,
            designation: employeeData.empDesignation,
            password: employeeData.empPassword,
        };

        console.log(body)

       return this.api.createEmployee(body).subscribe(
            (res: any) => {
                this.spinner = false;
                this.router.navigate(['/all-employees']);
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
