import { Component } from '@angular/core';
import { USER_STORAGE_KEY } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loged:boolean = false;
  constructor() {
    this.loged = localStorage.getItem(USER_STORAGE_KEY) ? true:false;
   }
}
