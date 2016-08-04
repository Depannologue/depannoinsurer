import {Component} from '@angular/core';
import { NavController,ViewController, Toast} from 'ionic-angular';
import {OnInit} from '@angular/core';
import {BasicformPage} from '../home/form'
import {TabsPage} from '../tabs/tabs';
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  login: string;
  passsword: string;
  form: BasicformPage;
  constructor(private nav: NavController) {}

  public onSubmit(formData) {
    console.log(formData);
    this.form = new BasicformPage();
    this.form.setFormData(formData);
    if(this.form.myData.login == "admin" && this.form.myData.login == "admin"){
      this.nav.push(TabsPage);
    }else{
      alert("Login ou mot de passe erronés !")
    }
  }

}
