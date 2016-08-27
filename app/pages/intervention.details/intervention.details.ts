import {Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {OnInit} from '@angular/core';

@Component({
  templateUrl: 'build/pages/intervention.details/intervention.details.html',
})
export class InterventionDetailsPage implements OnInit {
  intervention;
  public errorMessage;
  constructor(private navCtrl: NavController, params: NavParams) {
    this.intervention = params.data.intervention;
  }

  ngOnInit() {
  }

}
