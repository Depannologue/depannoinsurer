import {Component} from '@angular/core';
import {Modal, NavController,ViewController, NavParams} from 'ionic-angular';
import {InterventionService} from '../home/intervention.service';
import {ProfessionService} from '../home/profession.service';
import {OnInit} from '@angular/core';

@Component({
  templateUrl: 'build/pages/about/intervention-details.html',
})
export class InterventionDetailsPage implements OnInit {
  intervention;
  professions;
  public errorMessage;
  constructor(private navCtrl: NavController, params: NavParams, private professionService: ProfessionService) {
    this.intervention = params.data.intervention;
    this.professions = params.data.professions;
  }

  getProfessions() {
    this.professionService.getProfessions()
        .subscribe(
         professions => this.professions = professions,
         error =>  this.errorMessage = <any>error);
    return this.professions
  }

  ngOnInit() {
    this.getProfessions();
  }

  getProfessionNameWithId(id) : String{
    var professionName = "Profession inexistante";
    professionName = this.professions.find(function(profession) { return profession['id'] == id })["name"];
    return professionName;
  }

}
