import {Component} from '@angular/core';
import {Modal, NavController,ViewController} from 'ionic-angular';
import {ProfessionService} from './profession.service';
import {OnInit} from '@angular/core';



@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit {
  professions: Object;
  interventionTypes: Object;
  public errorMessage;
  constructor(private nav: NavController,
              private professionService: ProfessionService ) {}

  getProfessions() {
    this.professionService.getProfessions()
            .subscribe(
             professions => this.professions = professions,
             error =>  this.errorMessage = <any>error);
  }
  getInterventionTypes(profession){
    console.log("ok"); 
    this.interventionTypes = profession.intervention_type;
  }
  ngOnInit() {
      this.getProfessions();
  }
}
