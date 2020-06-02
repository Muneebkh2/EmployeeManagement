import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  errorMessage
  isLogginInFLAG
  constructor(private api: AuthService, private displayError: NzNotificationService, private router: Router, private route: ActivatedRoute) { }
  token = this.route.snapshot.paramMap.get('token');

  ngOnInit(): void {
  }

  reset(value) {
    this.isLogginInFLAG = true;

    let body = {
      "token": this.token,
      "password": value.password,
      "confirm_password": value.confirm_password
    };
    console.log(body)
    this.api.forgotPassword(body).subscribe((res: any) => {
      this.isLogginInFLAG = false;
      this.router.navigate(['/login']);
      this.displayError.create(
        'success', 'Success', res.message,
        { nzDuration: 4500 }
      );
    },
      (err: any) => {
        this.isLogginInFLAG = false;
        this.displayError.create(
          'error', 'Error', err.error.email,
          { nzDuration: 6500 }
        );
      })
  }


}
