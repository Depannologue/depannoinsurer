import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {OnInit, AfterContentInit} from '@angular/core';
import {InterventionService} from '../pages/home/intervention.service'

@Component({
  selector: 'demo',
  template: `
  <ion-grid style="opacity: 0.8;">
      <ion-row>
        <ion-col width-25></ion-col>
            <div class="blockslide">
              <ion-slides pager>
                <ion-slide *ngFor="let profession of professions">
                  <ion-list >
                      <ion-item >
                        <ion-avatar item-left>
                          <img src="img/avatar-cher.png">
                          </ion-avatar>
                        </ion-item >
                      </ion-list>
                          <ion-list >
                        <ion-item inset>
                          <ion-icon name="speedometer" item-left></ion-icon>
                            Nombre total d'interventions :
                        </ion-item>
                        <ion-item inset>
                          <ion-icon name="logo-euro" item-left></ion-icon>
                            Coût total :
                        </ion-item>
                        <ion-item inset>
                          <ion-icon name="heart" item-left></ion-icon>
                            Moyenne avis clients :
                        </ion-item>
                  </ion-list>
                </ion-slide>
              </ion-slides>
        </div>
        <ion-col width-25></ion-col>
        </ion-row>
  </ion-grid>
  `,

  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class DashBoard implements OnInit, AfterContentInit{
  dateBegin ="";
  dateEnd = "";

  data : Array<Object>;
  errorMessage;
  constructor(private navCtrl: NavController,private interventionService: InterventionService) {
  }
  getInterventions(startDate, endDate, profession) {
   this.interventionService.buildURL(startDate, endDate, profession)
                           .then(
                            interventions =>   this.data.push(interventions),
                            error =>  this.errorMessage = <any>error);
console.log(this.data)
                          }

  ngOnInit(){
    this.data = new Array(Object)
    this.getInterventions(this.dateBegin, this.dateEnd, 'serrurerie');
    this.getInterventions(this.dateBegin, this.dateEnd, 'plomberie');
    this.getInterventions(this.dateBegin, this.dateEnd, 'vitrerie');
    this.getInterventions(this.dateBegin, this.dateEnd, 'chauffage');
    this.getInterventions(this.dateBegin, this.dateEnd, 'electricite');
    console.log(this.data.length);
  }

  ngAfterContentInit(){
    console.log(this.data);
  }





}
