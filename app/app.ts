import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import { ProfessionService }   from './pages/home/profession.service';
import { InterventionService }   from './pages/home/intervention.service';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {FORM_PROVIDERS} from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import {RadarChart} from './components/radarChart'
import './rxjs-operators';
import '../node_modules/chart.js/dist/Chart.bundle.min.js';
@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers:[ProfessionService, HTTP_PROVIDERS, InterventionService, CHART_DIRECTIVES,FORM_PROVIDERS, RadarChart],
})

export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
