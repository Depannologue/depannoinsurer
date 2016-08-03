import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/contact/contact.html',
})

export class DateForm {
  myData;
  constructor() {
    this.myData = null;
  }

  public setFormData(formData) {
    console.log('Form submission is ', formData);
    this.myData = formData;
  }
}
