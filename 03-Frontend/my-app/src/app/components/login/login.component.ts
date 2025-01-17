import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaAuthModule, OKTA_AUTH } from '@okta/okta-angular';
import myAppConfig from '../../config/my-app-config';
import OktaSignIn from '@okta/okta-signin-widget';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  oktaSignIn: any;
  constructor(@Inject(OKTA_AUTH) private okaAuth: OktaAuth ) {
      this.oktaSignIn = new OktaSignIn({
        logo: 'assets/images/logo.png',
        baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
        clientId: myAppConfig.oidc.clientId,
        
      });
   }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
