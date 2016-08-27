import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {InterventionService} from '../../services/intervention.service';
import {Filter} from '../../services/filter';

@Component({
  selector: 'opend-intervention-list',
  template: `
  <ion-list >
    <ion-row responsive-sm responsive-md responsive-lg wrap >
      <ion-col width-33  *ngFor="let intervention of interventions" >
        <ion-card class="interventions">
          <ion-item >
            <ion-icon secondary name="contact" item-left large ></ion-icon>
            <h2 primary>Intervention N°{{intervention.id}}</h2>
            <p><b>Reférence client</b> : 074TEST </p>
            <p><b>Nom</b> : {{intervention.customer_lastname}} </p>
            <p><b>Prenom</b> : {{intervention.customer_firstname}} </p>
            <p><b>Date</b> : {{intervention.intervention_date | date: 'dd/MM/yyyy'}}</p>
            <p><b>Heure</b> : {{intervention.intervention_date | date: 'HH'}}H{{intervention.intervention_date | date: 'mm'}}</p>
            <p><b>Adresse</b>:</p>
            <p>{{intervention.address_address1}} </p>
            <p>{{intervention.address_zipcode}} {{intervention.address_city}}</p>
            <a href="tel:intervention.customer.phone_number.trim().replace('+33', '0')">
              <button small primary>
                <ion-icon name='call'></ion-icon>
                : {{intervention.customer_phone_number.trim().replace('+33', '0')}}
              </button>
            </a>
            <br>
            <a href="mailto:intervention.customer.email">
              <button small primary  >
                <ion-icon name='mail'></ion-icon>
                : Email
              </button>
            </a>
          </ion-item>
          <ion-item >
            <ion-icon InterventionProfessionIcon name="build" item-left large ></ion-icon>
            <p><b>Profession</b> : {{intervention.profession_name}} </p>
            <p><b>Intervention</b> : {{intervention.intervention_type_short_description}} </p>
          </ion-item>

          <ion-item  *ngIf="intervention.state == 'pending_pro_validation'">
            <ion-icon primary name="time" item-left large></ion-icon>
            En attente de validation
          </ion-item>
          <ion-item  *ngIf="intervention.state == 'pro_on_the_road'">
            <ion-icon primary name="car" item-left large></ion-icon>
            <h2>Dépanneur en route</h2>
            <p><button (click)="openInterventionMapPage(intervention)">
              <ion-icon name="locate"></ion-icon>
              Suivre son arrivée
            </button></p>
          </ion-item>
          <ion-item >
            <button item-right (click)="getInterventionDetails(intervention)"><ion-icon name="add"></ion-icon> d'informations
            </button>
          </ion-item>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-list>
  `,
  styles: [  `.interventions{width: 100%;
              padding: 10px;
              border: 1px solid gray;
              margin: 0;
              background-color: white;
              border-radius: 10px;
              overflow: auto;
              opacity: 0.8;} `],
  providers:[InterventionService]
})

export class InterventionPendingComponent implements OnInit{
  interventions: Object;
  openedInterventions: Object;
  errorMessage: any;
  @Output() showDetails: EventEmitter<Object> = new EventEmitter();
  constructor(private interventionService: InterventionService) {}

  getInterventions(filter: Filter) {
    this.interventionService.getInterventions(filter)
        .subscribe(
         interventions => this.interventions = interventions,
         error =>  this.errorMessage = <any>error);
  }

  getOpenedInterventions(){
    let filter = new Filter({type: "state", state:"opened", dateBegin:"", dateEnd:"",  profession:""});
    this.getInterventions(filter);
  }

  getInterventionDetails(intervention){
    this.showDetails.emit(intervention);
  }

  ngOnInit(){
    this.getOpenedInterventions()
  }
}
