import {Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import {InterventionService} from '../../services/intervention.service';
import {Filter} from '../../services/filter';

@Component({
  selector: 'profession-details',
  template: `
        <ion-list inset  class="interventions">
          <ion-item inset >
            <ion-icon name="build" item-left></ion-icon>
            {{profession | uppercase}}
          </ion-item>
          <ion-item>
          <ion-icon name="speedometer" item-left></ion-icon>
            Nombre d'interventions : {{interventionsNumber}}
          </ion-item>
          <ion-item inset>
            <ion-icon name="logo-euro" item-left></ion-icon>
            Coût total : {{totalPrice}} euros
          </ion-item>
          <ion-item inset>
            <ion-icon name="heart" item-left></ion-icon>
            Moyenne avis client : 4,5
          </ion-item>
        </ion-list>
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

export class ProfessionsDetailsComponent implements OnInit{
  @Input() filter : Filter;
  @Input() profession : string;
  interventionsNumber: Object;
  totalPrice: number;
  errorMessage: any;

  constructor(private interventionService: InterventionService){}


  getInterventionsPrice(filter: Filter) {
    this.interventionService.getInterventions(filter)
        .subscribe(
         interventions => this.totalPrice = this.totalInterventionsPrice(interventions),
         error =>  this.errorMessage = <any>error);
  }

  getInterventionsNumber(filter: Filter) {
    this.interventionService.getInterventions(filter)
        .subscribe(
         interventions => this.interventionsNumber = this.interventionsNumber = interventions.length,
         error =>  this.errorMessage = <any>error);
  }

  totalInterventionsPrice(interventions){
    let total = 0;
    interventions.forEach(function(element){
      total +=  parseInt(element.intervention_type_price);
    })
    return total;
  }

  ngOnInit(){
    this.getInterventionsPrice(this.filter);
    this.getInterventionsNumber(this.filter);
  }


}
