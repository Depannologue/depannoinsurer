import {Component, OnInit, Input} from '@angular/core';
import {InterventionService} from '../../services/intervention.service';
import {Filter} from '../../services/filter';

@Component({
  selector: 'intervention-number',
  template: `
        <ion-card class="interventions">
          <ion-item>
            <ion-avatar  item-left>
              <img src="img/{{img}}.png">
            </ion-avatar>
            <h2>{{interventionsNumber}}</h2>
            <p>{{message}}</p>
          </ion-item>
        </ion-card>
  `,
  styles: [  `.interventions{width: 100%;
              padding: 10px;
              border: 1px solid gray;
              margin: 0;
              background-color: white;
              border-radius: 10px;
              overflow: auto;
              opacity: 0.9;} `],
  providers:[InterventionService]
})

export class InterventionInprogressComponent implements OnInit{
  @Input() filter : Filter;
  @Input() message : string;
  @Input() img: string;
  interventionsNumber: number;
  errorMessage: any;

  constructor(private interventionService: InterventionService){}


  getInterventions(filter: Filter) {
    this.interventionService.getInterventions(filter)
        .subscribe(
         interventions => this.interventionsNumber = interventions.length,
         error =>  this.errorMessage = <any>error);
  }
  ngOnInit(){
    this.getInterventions(this.filter);
  }
}
