import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean;
  userFullName: string ='';
  constructor(private oktaAuthService: OktaAuthStateService,@Inject(OKTA_AUTH) private okaAuth: OktaAuth ) {
    
  }
  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated;
        this.getUserDetails();
      }
    );
  }
  getUserDetails() {
if(this.isAuthenticated){
  this.okaAuth.getUser().then((res) => {
    this.userFullName = res.name as string;
    console.log();

  })
}

}

logout(){
  this.okaAuth.signOut();
}
}
