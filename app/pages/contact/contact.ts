import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {LineChart} from '../../components/lineChart'
import {BarChart} from '../../components/barChart'
import {RadarChart} from '../../components/radarChart'
import {InterventionService} from '../home/intervention.service'
import {OnInit, AfterContentInit} from '@angular/core';
import {DateForm} from './dateForm';
import {DashBoard} from '../../components/dashBoard'

@Component({
  templateUrl: 'build/pages/contact/contact.html',
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES, LineChart, BarChart, RadarChart, DashBoard]

})
export class ContactPage implements OnInit, AfterContentInit {
  errorMessage : any;
  dateBegin: string;
  dateEnd:string;
  data : Array<Object> ;
  serrurerie;
  plombrerie;
  vitrerie;
  chaffage;
  electricite;
  professions=[{name: "Serrurerie", slug:"serrurerie"},
              {name: "Serrurerie", slug:"plomberie"},
              {name: "Serrurerie", slug:"vitrerie"},
              {name: "Serrurerie", slug:"chauffage"},
              {name: "Serrurerie", slug:"electricite"}];
  form;
  chart;
  constructor(private navCtrl: NavController, private interventionService: InterventionService, private radarChart: RadarChart) {
  }
   getInterventions(startDate, endDate, profession) {
    this.interventionService.buildURL(startDate, endDate, profession)
                            .then(
                             interventions =>   this.data.push(interventions),
                             error =>  this.errorMessage = <any>error);
  }
  ngOnInit() {


  }
  ngAfterContentInit() {

 }
  totalPrice(data){

  console.log(this.data);
    var totalPrice = 0;
    data.forEach(function(element){
      totalPrice = totalPrice + parseInt(element.intervention_type.price)
    })
    return totalPrice;
  }
  totalInterventions(data){
    var totalInterventions = 0;
    data.forEach(function(element){
      totalInterventions = data.length;
    })
    return totalInterventions;
  }

}
