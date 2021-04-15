import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  email = this.localStorageService.get('email');
  user: User = new User();
  check: boolean;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.check = this.authService.isAuthenticated();
    this.checkToEmail();
    this.getEmail();
    this.checkAdmin();
  }

  goToCarAdd() {
    this.router.navigate(['./cars/add']);
  }

  goToBrandAdd() {
    this.router.navigate(['./brands/add']);
  }

  goToColorAdd() {
    this.router.navigate(['./colors/add']);
  }

  goToCarList() {
    this.router.navigate(['./cars/edit']);
  }

  goToBrandList() {
    this.router.navigate(['./brands/edit']);
  }

  goToColorList() {
    this.router.navigate(['./colors/edit']);
  }

  checkToEmail() {
    if (this.localStorageService.get('email')) {
      return true;
    } else {
      return false;
    }
  }

  getEmail() {
    if (this.email) {
      this.userService.getByEmail(this.email).subscribe((response) => {
        this.user = response;
        this.authService.getClaims(this.user.id).subscribe((response) => {
          if (response.data.length > 0) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].name == 'admin') {
                this.localStorageService.set('yetki', 'var');
              } else {
                this.localStorageService.set('yetki', 'yok');
              }
            }
            this.localStorageService.set('id', this.user.id.toString());
          }
        });
      });
    }
  }

  logOut() {
    this.localStorageService.clean();
    this.toastrService.success('Başarıyla Çıkış Yapıldı');
    this.router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  checkAdmin() {
    if (this.localStorageService.get('yetki') == 'var') {
      return true;
    } else {
      return false;
    }
  }
}
