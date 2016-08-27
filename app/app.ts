import {Component, provide} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {InterventionPage} from './pages/intervention/intervention';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {FORM_PROVIDERS} from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import {Http} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './services/auth.service';
import {ProfilePage} from './pages/profile/profile';
import './rxjs-operators';
import '../node_modules/chart.js/dist/Chart.bundle.min.js';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers:[ HTTP_PROVIDERS, CHART_DIRECTIVES, FORM_PROVIDERS],
})

export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform,  private auth: AuthService) {
    this.rootPage = ProfilePage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({noJwtError: true}), http);
    },
    deps: [Http]
  }),
  AuthService
]);
