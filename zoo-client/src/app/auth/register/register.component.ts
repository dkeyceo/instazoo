import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(private authService: AuthService,
    private notificationService: NotificationService,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.formGroup = this.createRegistrationForm()
  }

  createRegistrationForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required ])],
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    })
  }

  submit(){
    this.authService.register({
      email: this.formGroup.value.email,
      username: this.formGroup.value.username,
      firstname: this.formGroup.value.firstname,
      lastname: this.formGroup.value.lastname,
      password: this.formGroup.value.password,
      confirmPassword: this.formGroup.value.confirmPassword,

    }).subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar(`Successfully registered with username ${this.formGroup.value.username}`);
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error.message);
    });
  }
}
