import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {InterventionService} from '../pages/home/intervention.service'

@Component({
  selector: 'bar-chart-demo',
  template: `

  <base-chart style="display:block;" class="chart"
             [datasets]="barChartData"
             [labels]="barChartLabels"
             [options]="barChartOptions"
             [legend]="barChartLegend"
             [chartType]="barChartType"
             (chartHover)="chartHovered($event)"
             (chartClick)="chartClicked($event)"></base-chart>

              <ion-row>
                <ion-col width-15></ion-col>
                <ion-col width-30>
                   <ion-item>
                     <ion-label stacked>Date fin</ion-label>
                     <ion-input (change)="onChangeBeginDate()"[(ngModel)]="dateBegin" type="date"  ></ion-input>
                   </ion-item>
                </ion-col>
                <ion-col width-30>
                  <ion-item>
                     <ion-label stacked>Date fin</ion-label>
                     <ion-input   (change)="onChangeEndDate()" [(ngModel)]="dateEnd" type="date"  ></ion-input>
                   </ion-item>
                </ion-col>
                <ion-col width-15></ion-col>
              </ion-row>
              <ion-row>
                <ion-col width-30></ion-col>
                <ion-col width-30><button *ngIf="dateBeginShowButton && dateEndShowButton" (click)="changeData()">Valider</button></ion-col>
                <ion-col width-30></ion-col>
              </ion-row>

  `,

  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class BarChart{
  dateBegin: string;
  oldDateBegin = this.dateBegin;
  dateEnd: string;
  errorMessage;
  differ:any;
  data: Array<Object>;
  dateBeginShowButton = false;
  dateEndShowButton = false;
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Serrurerie', 'plomberie', 'vitrerie', 'chauffage', 'electricite'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [0, 0, 0, 0, 0], label:'Coût interventions par profession'},
  ];
  constructor( private interventionService: InterventionService) {
  }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  changeData(){
    console.log(this.data)
    let _barChartData:Array<any> = [{data: [this.data[1],this.data[2],this.data[3],this.data[4],this.data[5]], label:'Coût interventions par profession'}] ;
    this.barChartData = _barChartData;
    this.dateBegin = "";
    this.dateEnd = "";
    this.dateEndShowButton = false;
    this.dateBeginShowButton = false;
  }
  totalPrice(interventions){
    var totalPrice = 0;
    var interv = Object.keys(interventions).map(function (key) {return interventions[key]});
    interv.forEach(function(element){
      totalPrice = totalPrice + parseInt(element.intervention_type.price)
    })
    this.data.push(totalPrice);
  }
  getInterventions(startDate, endDate, profession) {
   this.interventionService.buildURL(startDate, endDate, profession)
                           .then(
                            interventions =>  this.totalPrice(interventions),
                            error =>  console.log(error));
 }
 onChangeEndDate(){
   this.data = new Array(Object);
   this.getInterventions(this.dateBegin, this.dateEnd, 'serrurerie');
   this.getInterventions(this.dateBegin, this.dateEnd, 'plomberie');
   this.getInterventions(this.dateBegin, this.dateEnd, 'vitrerie');
   this.getInterventions(this.dateBegin, this.dateEnd, 'chauffage');
   this.getInterventions(this.dateBegin, this.dateEnd, 'electricite');
   this.dateEndShowButton = true;
 }
 onChangeBeginDate(){
   this.dateBeginShowButton = true;
 }

}
