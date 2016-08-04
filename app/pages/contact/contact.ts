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
  dateBegin ="";
  dateEnd = "";
  obj: [{name: string, value: string}];
  data : Array<Object>;
  totalInterv;
  totalIntervPrice : Array<number>
  serrurerie;
  plombrerie;
  vitrerie;
  chaffage;
  electricite;
  professions=[{name: "Serrurerie", slug:"serrurerie"},
              {name: "Plomberie", slug:"plomberie"},
              {name: "Vitrerie", slug:"vitrerie"},
              {name: "Chauffage", slug:"chauffage"},
              {name: "Eléctricité", slug:"electricite"}];
  form;
  chart;
  constructor(private navCtrl: NavController, private interventionService: InterventionService, private radarChart: RadarChart) {
  }
   getInterventions(startDate, endDate, profession) {
    this.interventionService.buildURL(startDate, endDate, profession)
                            .then(
                             interventions =>   this.totalPrice(interventions),
                             error =>  this.errorMessage = <any>error);
  }
  ngOnInit() {
    this.totalInterv = new Array(); 
    this.getInterventions(this.dateBegin, this.dateEnd, 'serrurerie');
    this.getInterventions(this.dateBegin, this.dateEnd, 'plomberie');
    this.getInterventions(this.dateBegin, this.dateEnd, 'vitrerie');
    this.getInterventions(this.dateBegin, this.dateEnd, 'chauffage');
    this.getInterventions(this.dateBegin, this.dateEnd, 'electricite');
  }
  ngAfterContentInit() {

 }
  totalPrice(data){
    var totalPrice = 0;
    console.log(data[0])
    data.forEach(function(element){
      totalPrice = totalPrice + parseInt(element.intervention_type.price)
    })
    var name="";
    if (data.length !== 0){
    if (data[0].intervention_type.profession_id == 1){
      name = "serrurerie";
    }else if(data[0].intervention_type.profession_id == 2){
      name = "plomberie";
    }else if(data[0].intervention_type.profession_id == 3){
      name = "vitrerie";
    }else if(data[0].intervention_type.profession_id == 4){
      name = "chauffage";
    }else{
      name = "electricite";
    }
    this.totalInterv.push({name: name, totalIntervention: data.length, price: totalPrice });
    console.log(this.totalInterv)
  }
  }


}
