import {Component, OnInit} from '@angular/core';
import {InterventionInprogressComponent} from '../../components/dashboard/intervention.inprogress.component'
import {Filter} from '../../services/filter'
import {DoughnutChartComponent} from '../../components/charts/doughnut'
import {PieChartComponent} from '../../components/charts/pie'
import {BarChartComponent} from '../../components/charts/bar'
import {InterventionService} from '../../services/intervention.service'
import {ProfessionsDetailsComponent} from '../../components/dashboard/professions.details.component'
import {PieData} from '../../components/charts/pieData'

@Component({
  templateUrl: 'build/pages/contact/contact.html',
  directives: [InterventionInprogressComponent, DoughnutChartComponent, ProfessionsDetailsComponent, PieChartComponent, BarChartComponent],
  providers: [InterventionService]
})

export class ContactPage implements OnInit  {
  errorMessage: any;
  inProgressInterventionMessage : string = "Interventions en cours";
  inProgressInterventionFilter  : Filter = new Filter({type: "state", state:"opened", dateBegin:"", dateEnd:"",  profession:""});
  closedInterventionMessage : string = "Interventions cloturées";
  closedInterventionFilter : Filter = new Filter({type: "state", state:"closed", dateBegin:"", dateEnd:"",  profession:""});
  serrurerie = "serrurerie";
  plomberie = "plomberie";
  vitrerie = "vitrerie";
  totalInterventions: number;
  serrurerieInterventionsNumber: number;
  plomberieInterventionsNumber: number;
  vitrerieInterventionsNumber: number;
  serrurerieFilter: Filter = new Filter({type: "profession", state:"", dateBegin:"", dateEnd:"",  profession:"serrurerie"}); ;
  plomberieFilter: Filter = new Filter({type: "profession", state:"", dateBegin:"", dateEnd:"",  profession:"plomberie"});;
  vitrerieFilter: Filter = new Filter({type: "profession", state:"", dateBegin:"", dateEnd:"",  profession:"vitrerie"});;
  imgPending: string="pending";
  imgClosed: string ="closed";
  dateBegin: string ;
  dateEnd: string;
  pieData: Array<PieData>;
  barData: Array<PieData>;

  constructor(private interventionService: InterventionService){}

  getInterventions(filter: Filter) {
    this.interventionService.getInterventions(filter)
        .subscribe(
         interventions => this.totalInterventions = interventions.length,
         error =>  this.errorMessage = <any>error);
  }


  ngOnInit(){
    this.getInterventions({type: "", state:"", dateBegin:"", dateEnd:"",  profession:""});

    this.interventionService.getInterventions({type: "profession", state:"", dateBegin:"", dateEnd:"",  profession:"serrurerie"})
        .subscribe(
         interventions => this.serrurerieInterventionsNumber = interventions.length,
         error =>  this.errorMessage = <any>error);

   this.interventionService.getInterventions({type: "profession", state:"", dateBegin:"", dateEnd:"",  profession:"vitrerie"})
       .subscribe(
        interventions => this.vitrerieInterventionsNumber = interventions.length,
        error =>  this.errorMessage = <any>error);

   this.interventionService.getInterventions({type: "profession", state:"", dateBegin:"", dateEnd:"",  profession:"plomberie"})
       .subscribe(
        interventions => this.plomberieInterventionsNumber = interventions.length,
        error =>  this.errorMessage = <any>error);

  }
  totalInterventionsPrice(interventions){
    let total = 0;
    interventions.forEach(function(element){
      total +=  parseInt(element.intervention_type_price);
    })
    return total;
  }
  getPieData(){
    this.pieData = new Array<PieData>();
    this.interventionService.getInterventions({type: "profession&date", state:"", dateBegin: this.dateBegin, dateEnd:this.dateEnd,  profession:"serrurerie"})
        .subscribe(
         interventions => this.pieData.push(new PieData({profession:"serrurerie", interventionsNumber: interventions.length , totalPrice: this.totalInterventionsPrice(interventions)})) ,
         error =>  this.errorMessage = <any>error);

   this.interventionService.getInterventions({type: "profession&date", state:"", dateBegin: this.dateBegin, dateEnd:this.dateEnd,  profession:"vitrerie"})
       .subscribe(
        interventions => this.pieData.push(new PieData({profession:"vitrerie", interventionsNumber: interventions.length, totalPrice: this.totalInterventionsPrice(interventions)})),
        error =>  this.errorMessage = <any>error);

   this.interventionService.getInterventions({type: "profession&date", state:"", dateBegin: this.dateBegin, dateEnd:this.dateEnd,  profession:"plomberie"})
       .subscribe(
        interventions => this.pieData.push(new PieData({profession:"plomberie", interventionsNumber: interventions.length , totalPrice: this.totalInterventionsPrice(interventions)})),
        error =>  this.errorMessage = <any>error);


  }


}
