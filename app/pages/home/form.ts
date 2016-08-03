import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/home/home.html',
})

export class BasicformPage {
  myData;
  constructor() {
    this.myData = null;
  }

  public setFormData(formData) {
    console.log('Form submission is ', formData);
    this.myData = formData;
  }
}
