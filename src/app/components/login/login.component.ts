import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.getUserByEmail(this.loginForm.value.email);

      this.authService.login(loginModel).subscribe(
        (response) => {
          this.localStorageService.set('id', String(this.userId));
          this.toastrService.info(response.message);
          this.localStorageService.set('token', response.data.token);
          this.localStorageService.set('email', this.loginForm.value.email);
          this.router.navigate(['/']).then((r) => window.location.reload());
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    } else {
      this.toastrService.warning('Lütfen Boş Bırakmayınız');
    }
  }

  getUserByEmail(email: string) {
    this.userService.getByEmail(email).subscribe((response) => {
      this.userId = response.id;
    });
  }
}
