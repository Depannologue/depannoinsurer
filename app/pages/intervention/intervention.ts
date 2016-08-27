import {Component} from '@angular/core';
import { NavController, Toast} from 'ionic-angular';
import {ProfessionsComponent} from '../../components/intervention/professions.component'
import {InterventionTypeComponent} from '../../components/intervention/intervention.type.component'
import {FormComponent} from '../../components/intervention/form.component'

@Component({
  templateUrl: 'build/pages/intervention/intervention.html',
  directives: [ProfessionsComponent, InterventionTypeComponent, FormComponent],
})

export class InterventionPage  {
  selectedProfession: Object;
  selectedInterventionType: Object;
  renderInterventionTypes: boolean;
  renderFrom: boolean;

  constructor(private nav: NavController) {}

  selectProfession(profession){
    this.selectedProfession = profession;
    this.renderInterventionTypes = true;
  }

  selectInterventionType(interventionType){
    this.selectedInterventionType = interventionType;
    this.renderFrom = true;
  }

  showError(error){
    this.showToastWithCloseButton(error);
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
