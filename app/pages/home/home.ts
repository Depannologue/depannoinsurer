import {Component} from '@angular/core';
import { NavController,ViewController, Toast} from 'ionic-angular';
import {ProfessionService} from './profession.service';
import {InterventionService} from './intervention.service';
import {OnInit} from '@angular/core';
import {BasicformPage} from './form'
import {Intervention} from './intervention'
import {InterventionType} from './interventionType'
import {AboutPage} from '../about/about'
@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage implements OnInit {
  professions: Object;
  interventionTypes: Object;
  professionIMG : string;
  form: BasicformPage;
  isProgrammed: boolean;
  intervention: Intervention;
  interventions: Array<Intervention>;
  interventionType: InterventionType;
  errorMessage ;
  constructor(private nav: NavController,
              private professionService: ProfessionService,
              private interventionService: InterventionService) {}

  public getProfessions() {
    this.professionService.getProfessions()
            .subscribe(
             professions => this.professions = professions,
             error =>  this.errorMessage = <any>error);
  }
  public getInterventionTypes(profession){
    this.interventionTypes = profession.intervention_type;
    this.professionIMG = profession.slug;
  }
  public buildIntervention(){
     if(this.interventionType == null){
       var message = "Veillez choisir un type d'intervention";
       this.showToastWithCloseButton(message);
       return ;
     }else {
     if (this.isProgrammed){
       var date = this.form.myData.date.split('-');
       var time = this.form.myData.time.split(':');
    }else{
       var date: any = ['1938','03','12'];
       var time: any = ['00','00','00'];
    }
    this.intervention = new Intervention(this.form.myData.address,
                                          this.form.myData.phoneNumber,
                                          this.form.myData.city,
                                          this.form.myData.email,
                                          this.form.myData.zipcode,
                                          this.form.myData.firstname,
                                          this.form.myData.lastname,
                                          date[2],
                                          date[1],
                                          date[0],
                                          time[0],
                                          time[1],
                                          this.interventionType.slug,
                                          this.interventionType.profession_id,
                                          !this.isProgrammed);
    return this.intervention;
  }
  }

  public postIntervention(){
    if (!this.buildIntervention()) { return; }
    this.interventionService.postIntervention(this.intervention)
                     .subscribe(
                       intervention  => console.log(intervention),
                       error => this.showToastWithCloseButton(this.getError(error))
                       )

  }

  public onSubmit(formData) {
    console.log(formData);
    this.form = new BasicformPage();
    this.form.setFormData(formData);
    this.postIntervention();
    this.nav.push(AboutPage)
  }

  ngOnInit() {
    this.getProfessions();
  }
  setImmediate(){
    this.isProgrammed = false;
  }
  setProgrammed(){
    this.isProgrammed = true;
  }
  setInterventionType(interventionType){
    this.interventionType = interventionType;
  }
  getError(str){
    var err = JSON.parse(str);
    var errObj = Object.keys(err).map(function (key) {return err[key]});
    var message='Erreur : ';
    message = message +  errObj[0][0].message;
    return message;
  }
  showToastWithCloseButton(message){

    const toast = Toast.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    this.nav.present(toast);
}

}
