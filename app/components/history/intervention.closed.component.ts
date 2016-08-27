import {Component, OnInit} from '@angular/core';
import {InterventionService} from '../../services/intervention.service';
import {Filter} from '../../services/filter';

@Component({
  selector: 'closed-intervention-list',
  template: `
      <ion-list class="interventions" >
        <ion-list-header >
        <h3>Historique</h3>
        </ion-list-header>
        <ion-item >
          <ion-icon name="calendar" item-left></ion-icon>
            Filtrer par date
        </ion-item>
        <ion-row responsive-sm responsive-md responsive-lg wrap>
          <ion-col width-33>
            <ion-item  >
              <ion-label stacked primary><b>Date de debut</b></ion-label>
              <ion-input [(ngModel)]="dateBegin" type="date" placeholder="JJ/MM/AAAA"></ion-input>
            </ion-item>
          </ion-col>
          <ion-col width-33>
           <ion-item >
              <ion-label stacked primary><b>Date de fin</b></ion-label>
              <ion-input [(ngModel)]="dateEnd" type="date" placeholder="JJ/MM/AAAA"></ion-input>
            </ion-item>
          </ion-col>
          <ion-col width-33 >
            <button (click)="getClosedInterventionsFilteredByDate()">
              Valider
            </button>
            <button (click)="getClosedInterventions()">
              Supprimer filtre
            </button>
          </ion-col>
        </ion-row>
        <ion-item  *ngFor="let intervention of interventions">
          <div item-right>
            <ion-note>
              <p>{{intervention.intervention_date | date: 'dd/MM/yyyy'}}</p>
              <p>{{intervention.intervention_date | date: 'HH'}}:{{intervention.intervention_date | date: 'mm'}}</p>
            </ion-note>
            <p>
              <button item-right (click)="openInterventionDetailsPage(intervention)">
              <ion-icon name="add"></ion-icon>
              details
              </button>
            </p>
          </div>
          <h2 primary>Intervention N°{{intervention.id}}</h2>
          <h3><b>Client</b> :
            <p>{{intervention.customer_lastname}} {{intervention.customer_firstname}}</p></h3>
          <h3><b>Intervention</b> :
            <p></p>
            <p>{{intervention.intervention_type_short_description}}</p></h3>
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

export class InterventionClosedComponent implements OnInit{
  interventions: Object;
  errorMessage: any;
  dateBegin: string;
  dateEnd:string;

  constructor(private interventionService: InterventionService) {}

  getInterventions(filter: Filter) {
    this.interventionService.getInterventions(filter)
        .subscribe(
         interventions => this.interventions = interventions,
         error =>  this.errorMessage = <any>error);
  }

  getClosedInterventions(){
    let filter = new Filter({type: "state", state:"closed", dateBegin:"", dateEnd:"",  profession:""});
    this.getInterventions(filter);
  }
  getClosedInterventionsFilteredByDate(){
    let filter = new Filter({type: "state&date", state:"closed", dateBegin: this.dateBegin, dateEnd: this.dateEnd,  profession:""});
    this.getInterventions(filter);
  }

  ngOnInit(){
    this.getClosedInterventions()
    console.log(this.interventions)
  }
}
