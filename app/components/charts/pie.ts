import {Component, Input, ChangeDetectionStrategy, DoCheck, IterableDiffers} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {InterventionService} from '../../services/intervention.service'
import {Filter} from '../../services/filter'
import {PieData} from './pieData';
// webpack html imports

@Component({
  selector: 'pie-chart',
  template: `
      <base-chart  style="display:block; " class="chart"
             [data]="pieChartData"
             [labels]="pieChartLabels"
             [chartType]="pieChartType"
             (chartHover)="chartHovered($event)"
             (chartClick)="chartClicked($event)"></base-chart>
  `,

  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers: [InterventionService]
})

export class PieChartComponent implements  DoCheck{
  // Pie
  public pieChartLabels:string[] = ['', '', ''];
  public pieChartData:number[] = [10, 0, 0];
  public pieChartType:string = 'pie';
  @Input() pieData: Array<PieData> = new Array<PieData>();
  differ:any;
  constructor(private interventionService: InterventionService, differs: IterableDiffers){
    this.differ = differs.find([]).create(null);
  }

  ngOnInit(){

  }
  ngDoCheck() {
    var changes = this.differ.diff(this.pieData);
    if (changes) {
      if(this.pieData.length==3){
        let _pieChartData: Array<number> = new Array();
        let _pieChartLabels: Array<string> = new Array();
        this.pieData.forEach(function(element){
          _pieChartData.push(element.interventionsNumber);
          _pieChartLabels.push(element.profession)
        })
        this.changeChartData(_pieChartData, _pieChartLabels )
      }
    }
  }

  changeChartData(pieChartData, pieChartLabels){
    this.pieChartData = pieChartData;
    this.pieChartLabels = pieChartLabels;
  }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
