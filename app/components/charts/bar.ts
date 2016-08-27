import {Component, Input, OnInit,DoCheck, IterableDiffers} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {InterventionService} from '../../services/intervention.service'
import {Filter} from '../../services/filter'
import {PieData} from './pieData';
// webpack html imports

@Component({
  selector: 'bar-chart',
  template: `
  <base-chart style="display:block;" class="chart"
             [datasets]="barChartData"
             [labels]="barChartLabels"
             [options]="barChartOptions"
             [legend]="barChartLegend"
             [chartType]="barChartType"
             (chartHover)="chartHovered($event)"
             (chartClick)="chartClicked($event)"></base-chart>
  `,
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers: [InterventionService]
})

export class BarChartComponent implements OnInit, DoCheck{
  // Pie
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['','',''];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [0, 0, 0], label:"Coût d'interventions par profession"}
  ];
  differ:any;
  @Input() barData: Array<PieData> = new Array<PieData>();
  constructor( differs: IterableDiffers){
    this.differ = differs.find([]).create(null);
  }
  ngOnInit(){

  }
  ngDoCheck() {
    var changes = this.differ.diff(this.barData);
    if (changes) {
      if(this.barData.length==3){
        let _pieChartData: Array<number> = new Array();
        let _pieChartLabels: Array<string> = new Array();
        this.barData.forEach(function(element){
          _pieChartData.push(element.totalPrice);
          _pieChartLabels.push(element.profession)
        })
        this.changeChartData(_pieChartData, _pieChartLabels )
      }
    }
  }
  changeChartData(pieChartData, pieChartLabels){
    this.barChartData = [{data: pieChartData, label:"Coût d'interventions par profession"}]
    this.barChartLabels = pieChartLabels;
  }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
