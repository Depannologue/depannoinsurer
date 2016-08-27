import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ProfessionService} from '../../services/profession.service'
import {OnInit} from '@angular/core';
import {InterventionTypeComponent} from './intervention.type.component'

@Component({
  selector: 'professions-list',
  template: `
            <div padding>
              <ion-segment [(ngModel)]="pofessionsList">
                <ion-segment-button value="depannage">
                  Dépannage
                </ion-segment-button>
                <ion-segment-button value="renovation">
                  Rénovation
                </ion-segment-button>
              </ion-segment>
            </div>
            <div [ngSwitch]="pofessionsList">
              <ion-list inset *ngSwitchCase="'depannage'">
                <button  ion-item clear block *ngFor="let profession of professions"   (click)="selectProfession(profession)">
                  <ion-avatar item-left>
                    <img src="img/{{profession.slug}}.png">
                  </ion-avatar>
                    {{profession.name}}
                </button>
              </ion-list>
              <ion-list  inset *ngSwitchCase="'renovation'">
                <ion-item >
                  <ion-avatar item-left>
                  </ion-avatar>
                </ion-item>
              </ion-list>
            </div>
  `,
  providers:[ProfessionService, InterventionTypeComponent],
  directives:[InterventionTypeComponent]
})
export class ProfessionsComponent implements OnInit{
  professions: Object[];
  @Output() selectedProfession: EventEmitter<Object> = new EventEmitter();
  errorMessage: any;

  constructor(private professionService: ProfessionService) {
  }

   getProfessions() {
    this.professionService.getProfessions()
            .subscribe(
             professions => this.professions = professions,
             error =>  this.errorMessage = <any>error);
  }
  selectProfession(profession){
    this.selectedProfession.emit(profession);
  }

  ngOnInit(){
     this.getProfessions();
  }

}
