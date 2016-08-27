import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {InterventionService} from '../../services/intervention.service'
import {Filter} from '../../services/filter'

// webpack html imports

@Component({
  selector: 'doughnut-chart',
  template: `
      <base-chart style="display:block"class="chart"
              [data]="doughnutChartData"
              [chartType]="doughnutChartType"
              [colors]="doughnutChartColors"
              (chartHover)="chartHovered($event)"
              (chartClick)="chartClicked($event)"></base-chart>

  `,
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers: [InterventionService]
})
export class DoughnutChartComponent implements OnInit, OnChanges{
  constructor(private interventionService: InterventionService){}
  // Doughnut
  errorMessage: any;
  @Input() interventionsNumber: number;
  @Input() totalInterventions: number;
  @Input() profession: string;
  public doughnutChartLabels:string[] = ["", "" ];
  public doughnutChartData:number[] = [0, 0];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartColors:Array<any>=[{backgroundColor:["rgba(20, 77, 245, 1)", " rgba(148, 159, 146, 0.8)"]}];


  ngOnInit(){
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['interventionsNumber'] || changes['totalInterventions'] ){
      this.doughnutChartData = [this.interventionsNumber, this.totalInterventions];
      this.doughnutChartLabels = [this.profession,"toutes professions"];
    }
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
