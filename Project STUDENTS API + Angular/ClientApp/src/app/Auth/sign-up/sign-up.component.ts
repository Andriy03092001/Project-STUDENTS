import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { SignUpModel } from '../Models/sign-up.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../Services/Api.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
  })
  export class SingUpComponent implements OnInit {

    constructor(
      private apiService: ApiService,
      private spinner: NgxSpinnerService,
      private notifier: NotifierService,
      private route: ActivatedRoute,
      private router:  Router
      ) { }

    model = new SignUpModel();
    errorMessage: string;
    confirmPassword: string;

    ngOnInit() {
      this.route.params.subscribe((params: Params) => {
        this.model.ParentId = params['id'];
      });
    }

    onSubmit() {
      this.spinner.show();
      this.notifier.hideAll();
      console.log(this.model.Password, this.confirmPassword);
      if (this.model.Password === this.confirmPassword) {
      this.apiService.SingUp(this.model).subscribe(
        data => {
          if (data.status === 200) {
            console.log(data);
            this.spinner.hide();
            this.notifier.notify('success', 'Ви успішно зареєструвались');
            this.router.navigate(['/sign-in']);
          } else {
          console.log('----error-----', data.errors);
          for (let i = 0; i < data.errors.length; i++) {
            this.notifier.notify('error', data.errors[i]);
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        }
        });
      } else {
        this.spinner.hide();
        this.notifier.notify('error', 'Паролі не співпадають');
      }

    }
}
