import {Component, Inject,Input, Output} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {Injectable} from '@angular/core';
import {InterventionService} from '../pages/home/intervention.service'


@Injectable()
@Component({
  selector: 'radar-chart-demo',
  template: `
  <base-chart style="display:block;" class="chart"
             [datasets]="radarChartData"
             [labels]="radarChartLabels"
             [chartType]="radarChartType"
             (chartHover)="chartHovered($event)"
             (chartClick)="chartClicked($event)"></base-chart>
             <ion-row>
               <ion-col width-15></ion-col>
               <ion-col width-30>
                  <ion-item>
                    <ion-label stacked>Date fin</ion-label>
                    <ion-input (change)="onChangeBeginDate()" [(ngModel)]="dateBegin" type="date"  ></ion-input>
                  </ion-item>
               </ion-col>
               <ion-col width-30>
                 <ion-item>
                    <ion-label stacked>Date fin</ion-label>
                    <ion-input    (change)="onChangeEndDate()"  [(ngModel)]="dateEnd" type="date"  ></ion-input>
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
export class RadarChart {
  dateBeginShowButton = false;
  dateEndShowButton = false;
  dateBegin: string='';
  dateEnd: string ='';
  errorMessage;
  data: Array<Object>;
  public radarChartLabels:string[] = ['Serrurerie', 'Vitrerie', 'Plomberie', 'Chauffage', 'Electricité'];

  public radarChartData:Array<any> = [
    {data: [0, 0, 0, 0, 0], label:'Nombre interventions par profession'},
  ];
  public radarChartType:string = 'radar';
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
    let _radarChartData:Array<any> = [{data: [this.data[1],this.data[2],this.data[3],this.data[4],this.data[5]], label:'Nombre interventions par profession'}] ;
    this.radarChartData = _radarChartData;
    this.dateBegin = "";
    this.dateEnd = "";
    this.dateBeginShowButton = false;
    this.dateEndShowButton = false;
  }
  getInterventions(startDate, endDate, profession) {
   this.interventionService.buildURL(startDate, endDate, profession)
                           .then(
                            interventions =>  this.data.push(interventions.length),
                            error =>  console.log(error));
 }
 onChangeEndDate(){
   this.data = new Array(Object);
   this.getInterventions(this.dateBegin, this.dateEnd, 'serrurerie');
   this.getInterventions(this.dateBegin, this.dateEnd, 'plomberie');
   this.getInterventions(this.dateBegin, this.dateEnd, 'vitrerie');
   this.getInterventions(this.dateBegin, this.dateEnd, 'chauffage');
   this.getInterventions(this.dateBegin, this.dateEnd, 'electricite');

   this.dateBeginShowButton = true;
 }
onChangeBeginDate(){
  this.dateEndShowButton = true;
}
}
