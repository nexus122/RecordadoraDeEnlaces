import { Component } from '@angular/core';
import { AuthService } from '@auth/service/authService';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user$ = this.authSvc.user$;
  constructor(private readonly authSvc: AuthService) { }
}
