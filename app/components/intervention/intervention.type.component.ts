import {Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'intervention-type-list',
  template: `
      <div padding responsive-sm responsive-md responsive-lg wrap>
        <ion-segment >
          <ion-segment-button >
            Type d'intervention
          </ion-segment-button>
        </ion-segment>
      </div>
      <ion-list inset responsive-sm responsive-md responsive-lg wrap>
        <button ion-item clear block *ngFor="let interventionType of profession.intervention_types" (click)="selectInterventionType(interventionType)" >
          <ion-avatar item-left>
            <img src="img/{{profession.slug}}.png">
            </ion-avatar>
            {{interventionType.short_description}}
        </button>
     </ion-list>
  `
})

export class InterventionTypeComponent{
  @Input() profession: Object;
  @Output() selectedInterventionType: EventEmitter<Object> = new EventEmitter();

  selectInterventionType(interventionType){
    this.selectedInterventionType.emit(interventionType);
  }
}
