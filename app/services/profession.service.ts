import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Headers} from 'angular2/http';
import {Storage, LocalStorage} from 'ionic-angular';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class ProfessionService {
  private professionURL = 'https://api.depannologue.dev/api/v1/professions';
  local: Storage = new Storage(LocalStorage);
  id_token : string;
  headers : Headers = new Headers();

  constructor (private http:Http, private authHttp: AuthHttp) {
  }



  requestHeader(id_token){
    let headers : Headers = new Headers();
    this.headers.append('Authorization', 'Basic ' + this.id_token);
  }
  getProfessions(): Observable<Array<Object>> {
    return this.authHttp.get(this.professionURL)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }

}
