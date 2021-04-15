import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  email: string;
  password: FormControl;
  user: User = new User();
  status: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.createProfileAddForm();
    this.email = localStorage.getItem('email');
    this.getUser();
  }

  createProfileAddForm() {
    this.profileForm = this.formBuilder.group({
      id: this.user.id,
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      password: ['', Validators.required],
      status: true,
    });
  }

  getUser() {
    if (this.email) {
      this.userService.getByEmail(this.email).subscribe(
        (response) => {
          this.user = response;
          if (response.status) {
            this.status = 'Aktif';
          } else {
            this.status = 'Aktif Değil';
          }
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }

  updateProfile() {
    if (this.profileForm.valid) {
      let profileModel = Object.assign({}, this.profileForm.value);
      this.userService.profileUpdate(profileModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
      this.logOut();
    } else {
      this.toastrService.error('Formu boş bırakmayınız!');
    }
  }

  logOut() {
    this.localStorageService.clean();
    this.toastrService.info('Lütfen Tekrar Giriş Yapınız.');
    this.router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
