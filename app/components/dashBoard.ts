import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {OnInit, AfterContentInit} from '@angular/core';
import {InterventionService} from '../pages/home/intervention.service'

@Component({
  templateUrl:'build/pages/contact/contact.html'
})
export class DashBoard implements OnInit, AfterContentInit{
  dateBegin ="";
  dateEnd = "";

  data : Array<Object>;
  errorMessage;
  constructor(private navCtrl: NavController,private interventionService: InterventionService) {
  }
  getInterventions(startDate, endDate, profession) {
   this.interventionService.buildURL(startDate, endDate, profession)
                           .then(
                            interventions =>   this.data.push(interventions),
                            error =>  this.errorMessage = <any>error);
console.log(this.data)
                          }

  ngOnInit(){
    this.data = new Array(Object)
    this.getInterventions(this.dateBegin, this.dateEnd, 'serrurerie');
    this.getInterventions(this.dateBegin, this.dateEnd, 'plomberie');
    this.getInterventions(this.dateBegin, this.dateEnd, 'vitrerie');
    this.getInterventions(this.dateBegin, this.dateEnd, 'chauffage');
    this.getInterventions(this.dateBegin, this.dateEnd, 'electricite');
    console.log(this.data.length);
  }

  ngAfterContentInit(){
    console.log(this.data);
  }





}
