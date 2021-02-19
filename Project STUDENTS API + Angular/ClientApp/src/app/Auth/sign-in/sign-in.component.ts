import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Services/Api.service';
import { SingInModel } from '../Models/sign-in.model';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private router: Router,
    ) { }

  model = new SingInModel();
  errorMessage: string;

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show();
    this.notifier.hideAll();
    this.apiService.SingIn(this.model).subscribe(
      data => {
        console.log(data);
        if (data.status === 200) {
          console.log(data);
          window.localStorage.setItem('token', data.token);
          const jwtData = data.token.split('.')[1];
          const decodedJwtJsonData = window.atob(jwtData);
          const decodedJwtData = JSON.parse(decodedJwtJsonData);
          this.apiService.loginStatus.emit(true);
          if (decodedJwtData.roles === 'User' || decodedJwtData.roles === 'Guest') {
            this.router.navigate(['/profile']);

          } else if (decodedJwtData.roles === 'Admin') {
            this.router.navigate(['/admin-panel']);
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        } else {
          console.log('----error-----', data.errors);
          for (let i = 0; i < data.errors.length; i++) {
            this.notifier.notify('error', data.errors[i]);
          }
          this.spinner.hide();
        }
      });



  }

}
