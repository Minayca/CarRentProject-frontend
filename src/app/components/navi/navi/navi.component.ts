import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

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
}
