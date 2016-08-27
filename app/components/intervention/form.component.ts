import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Intervention} from '../../services/intervention'
import {InterventionType} from '../../services/interventionType'
import {InterventionService} from '../../services/intervention.service'

@Component({
  selector: 'intervention-form',
  template: `
  <form class="interventionForm" #formData='ngForm' (ngSubmit)="onSubmit(formData.value)">
    <ion-grid>
      <ion-row responsive-sm responsive-md responsive-lg wrap>
        <ion-col width-70></ion-col>
        <ion-col width-30>
          <ion-segment>
            <ion-segment-button value="new" (click)="setImmediate()">
              immédiat
            </ion-segment-button>
            <ion-segment-button value="hot" (click)="setProgrammed()">
              programmé
            </ion-segment-button>
          </ion-segment>
        </ion-col>
      </ion-row>
      <ion-row responsive-sm responsive-md responsive-lg wrap>
        <ion-col width-20>
          <ion-item>
            <ion-label stacked>Référence client</ion-label>
            <ion-input type="text" ngControl="clientRef"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row responsive-sm responsive-md responsive-lg wrap *ngIf="isProgrammed">
        <ion-col width-30>
          <ion-item>
            <ion-label stacked>Date</ion-label>
            <ion-input required type="date" ngControl="date"></ion-input>
          </ion-item>
        </ion-col>
        <ion-col width-30>
          <ion-item>
            <ion-label stacked>Heure</ion-label>
            <ion-input required type="time" ngControl="time"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row responsive-sm responsive-md responsive-lg wrap>
        <ion-col width-30>
          <ion-item>
            <ion-label stacked>Nom</ion-label>
            <ion-input required type="text" ngControl="lastname"></ion-input>
          </ion-item>
        </ion-col>
        <ion-col width-30>
          <ion-item>
            <ion-label stacked >Prénom</ion-label>
            <ion-input required type="text" ngControl="firstname"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row responsive-sm responsive-md responsive-lg wrap>
        <ion-col width-30>
          <ion-item>
            <ion-label stacked >Adresse</ion-label>
            <ion-input required type="text" ngControl="address" ></ion-input>
          </ion-item>
        </ion-col>
        <ion-col width-15>
          <ion-item>
            <ion-label stacked>Ville</ion-label>
            <ion-input required type="text" ngControl="city" ></ion-input>
          </ion-item>
        </ion-col>
        <ion-col width-15>
          <ion-item>
            <ion-label stacked>Code postal</ion-label>
            <ion-input required type="text" ngControl="zipcode" ></ion-input>
          </ion-item>
        </ion-col>
      </ion-row >
      <ion-row responsive-sm responsive-md responsive-lg wrap>
        <ion-col width-30>
          <ion-item>
            <ion-label stacked>Télephone</ion-label>
            <ion-input required type="tel" ngControl="phoneNumber"></ion-input>
          </ion-item>
        </ion-col>
        <ion-col width-30>
          <ion-item>
            <ion-label stacked>Mail</ion-label>
            <ion-input required type="email"  ngControl="email"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row responsive-sm responsive-md responsive-lg wrap>
        <ion-col width-60>
          <button block  >Résérver</button>
        </ion-col>
      </ion-row>
  </ion-grid>
</form>
  `,
  styles: [  `.interventionForm{width: 100%;
              padding: 10px;
              border: 1px solid gray;
              margin: 0;
              background-color: white;
              border-radius: 10px;
              overflow: auto;
              opacity: 0.9;} `],
providers:[InterventionService]
})

export class FormComponent{
  formData;
  isProgrammed: boolean;
  intervention: Intervention;
  @Input() interventionType: InterventionType;
  @Output()  error: EventEmitter<Object> = new EventEmitter();

  constructor(private interventionService: InterventionService) {
    this.formData = null;
  }

  setFormData(formData) {
    console.log('Form submission is ', formData);
    this.formData = formData;
  }

  setImmediate(){
    this.isProgrammed = false;
  }

  setProgrammed(){
    this.isProgrammed = true;
  }

  public buildIntervention(){
    if (this.isProgrammed){
       var date = this.formData.date.split('-');
       var time = this.formData.time.split(':');
    }else{
       var date: any = ['1938','03','12'];
       var time: any = ['00','00','00'];
    }
    this.intervention = new Intervention(this.formData.address,
                                          this.formData.phoneNumber,
                                          this.formData.city,
                                          this.formData.email,
                                          this.formData.zipcode,
                                          this.formData.firstname,
                                          this.formData.lastname,
                                          date[2],
                                          date[1],
                                          date[0],
                                          time[0],
                                          time[1],
                                          this.interventionType.id,
                                          this.interventionType.profession_id,
                                          !this.isProgrammed);
    return this.intervention;

  }

  onSubmit(formData) {
    this.setFormData(formData)
    this.postIntervention();
  }

  getError(str){
    var err = JSON.parse(str);
    var errObj = Object.keys(err).map(function (key) {return err[key]});
    var message='Erreur : ';
    message = message +  errObj[0][0].message;
    return message;
  }

  postIntervention(){
    if (!this.buildIntervention()) { return; }
    this.interventionService.postIntervention(this.intervention)
                     .subscribe(
                       intervention  => console.log(intervention),
                       error => this.error.emit(this.getError(error))
                       )
  }

}
