import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {InterventionDetailsPage} from '../intervention.details/intervention.details'
import {InterventionPendingComponent} from '../../components/history/intervention.pending.component'
import {InterventionClosedComponent} from '../../components/history/intervention.closed.component'

@Component({
  templateUrl: 'build/pages/history/history.html',
  directives:[InterventionPendingComponent, InterventionClosedComponent]
})

export class HistoryPage  {
  constructor(private navCtrl: NavController) {
  }

  showInterventionDetails(intervention){
    this.navCtrl.push(InterventionDetailsPage, { intervention: intervention });
  }

}
