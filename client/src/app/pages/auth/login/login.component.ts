import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenManagerService } from 'src/app/services/token-manager.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isLogginInFLAG: boolean = false;
    errorMessage: string;
    spinner: boolean = false;

    constructor(private displayError: NzNotificationService, private router: Router, private api: AuthService, private token: TokenManagerService) { }

    ngOnInit(): void {
    }

    // a method for authenticate user with their credentials.
    login(value) {
        this.isLogginInFLAG = true; // set flag to display spinner

        let body = {
            email: value.email,
            password: value.password
        };

        this.api.login(body).subscribe(
            (res: any) => {
                this.token.store(res.token, res.user.role, res.user.email, res.user.name, res.user.id);
                this.isLogginInFLAG = false; // reset flag to display spinner
                if (this.token.retrieveUserRole() === 1) {
                    this.router.navigate(['/dashboard'])
                } else if (this.token.retrieveUserRole() === 3) {
                    this.router.navigate(['/employee-profile'])
                }
            },
            (err) => {
                this.isLogginInFLAG = false; // reset flag to display spinner
                this.errorMessage = 'Invalid login credentials';
            }
        );
    }


    sendEmail(value) {
        this.spinner = true;  // progressing flag
        // send request to server.
        this.api.forgotPasswordEmail(value).subscribe(
            (res: any) => {
                this.spinner = false; // progressing flag
                this.displayError.create(
                    'success', 'Success', res.message,
                    { nzDuration: 6500 }
                );
                setTimeout(() => {
                    location.reload()
                }, 1000);
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
