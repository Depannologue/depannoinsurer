// app/pages/profile/profile.ts

import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthService} from '../../services/auth.service';
import {TabsPage} from '../tabs/tabs'
@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage  {

  // We need to inject AuthService so that we can
  // use it in the view
  constructor(private auth: AuthService, private nav: NavController) { }

  login(){
    this.auth.login();
    this.auth.navChange.subscribe(nav => this.navChange(nav))
  }
  navChange(nav){
    if(nav){
      this.nav.push(TabsPage); 
    }
  }

}
