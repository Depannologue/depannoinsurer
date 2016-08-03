import {Component} from '@angular/core';
import {Modal, NavController,ViewController, NavParams} from 'ionic-angular';
import {InterventionService} from '../home/intervention.service';
import {ProfessionService} from '../home/profession.service';
import {OnInit} from '@angular/core';
import {InterventionDetailsPage} from './intervention-details'



@Component({
  templateUrl: 'build/pages/about/intervention-map.html',
})
class InterventionMapPage {
  intervention;

  constructor(params: NavParams) {
    this.intervention = params.data.intervention;
  }

}

@Component({
  templateUrl: 'build/pages/about/about.html'
})

export class AboutPage implements OnInit{
  openedInterventions: Array<Object>;
  closedInterventions: Array<Object>;
  date1;
  date2;
  professions: Array<Object>;
  public errorMessage;
  constructor(private navCtrl: NavController, private interventionService: InterventionService, private professionService: ProfessionService) {
  }

  getOpenedInterventions() {
    this.interventionService.getOpenedInterventions()
        .subscribe(
         interventions => this.openedInterventions = interventions,
         error =>  this.errorMessage = <any>error);
  }

  getClosedInterventions() {
    this.interventionService.getClosedInterventions()
        .subscribe(
         interventions => this.closedInterventions = interventions,
         error =>  this.errorMessage = <any>error);
  }

  getClosedInterventionsBetweenDate(oldDateTime,newDateTime) {
    this.interventionService.getClosedInterventionsBetweenDate(oldDateTime,newDateTime)
        .subscribe(
         interventions => this.closedInterventions = interventions,
         error =>  this.errorMessage = <any>error);
  }

  getProfessions() {
    this.professionService.getProfessions()
        .subscribe(
         professions => this.professions = professions,
         error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getProfessions();
    this.getOpenedInterventions();
    this.getClosedInterventions();
  }

  getProfessionNameWithId(id) : String{
    var professionName = "Profession inexistante";
    professionName = this.professions.find(function(profession) { return profession['id'] == id })["name"];
    return professionName;
  }

  openInterventionDetailsPage(intervention) {
    this.navCtrl.push(InterventionDetailsPage, { intervention: intervention, professions: this.professions });
  }

  openInterventionMapPage(intervention) {
    this.navCtrl.push(InterventionMapPage, { intervention: intervention });
  }

  getClosedBetweenTime() {
    this.closedInterventions = null;
    this.getClosedInterventionsBetweenDate(this.date1,this.date2);
  }
  getClosed() {
    this.closedInterventions = null;
    this.getClosedInterventions();

  }

}
