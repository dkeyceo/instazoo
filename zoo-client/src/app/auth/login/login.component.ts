import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder) {
    if (this.tokenStorageService.getUser()) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.formGroup = this.createLoginForm()
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  submit(){
    this.authService.login({
      username: this.formGroup.value.username,
      password: this.formGroup.value.password,
    }).subscribe(data => {
      console.log(data);
      this.tokenStorageService.saveToken(data.token);
      this.tokenStorageService.saveUser(data);
      this.notificationService.showSnackBar('Successfully logged in');
      this.router.navigate(['/']);
      window.location.reload();
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error.message);
    });
  }

}
