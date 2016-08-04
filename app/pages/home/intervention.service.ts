import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { Intervention } from './intervention'
@Injectable()
export class InterventionService {

  constructor (private http:Http) {}

  private interventionURL = 'https://api.depannodev.xyz/api/v1/interventions';
  buildURL(startDate="", endDate="", profession=""):Promise<Array<Object>>{
    var url = this.interventionURL + "?start_date=" + startDate + "&end_date=" + endDate + "&intervention_type[profession[slug]]=" + profession;
    console.log(url)
    return this.http.get(url)
              .toPromise()
                   .then(this.extractData)
                   .catch(this.handleError);
  }
  getInterventions(): Promise<Array<Object>> {
     return this.http.get(this.interventionURL)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);;
  }


  postIntervention (intervention: Intervention): Observable<Intervention> {
    let body = JSON.stringify({ intervention });
    console.log(body );
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.interventionURL, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  private openedInterventionsURL = 'https://api.depannologue.dev/api/v1/interventions?is_not_in_state=closed';
  getOpenedInterventions(): Observable<Array<Object>> {
     return this.http.get(this.openedInterventionsURL)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private closedInterventionsURL = 'https://api.depannologue.dev/api/v1/interventions?is_in_state=closed';
  getClosedInterventions(): Observable<Array<Object>> {
     return this.http.get(this.closedInterventionsURL)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  //private closedInterventionsBetweenDateURL = 'https://api.depannologue.dev/api/v1/interventions?is_in_state=closed&start_date=2016-07-01&end_date=2016-07-30';
  private closedInterventionsBetweenDateURL = 'https://api.depannologue.dev/api/v1/interventions?is_in_state=closed';
  getClosedInterventionsBetweenDate(date1,date2): Observable<Array<Object>> {

    this.closedInterventionsBetweenDateURL = this.closedInterventionsBetweenDateURL+'&start_date='+date1+'&end_date='+date2;
     return this.http.get(this.closedInterventionsBetweenDateURL)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.interventions || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error._body ? `${error._body}` : 'Server error';
      return Observable.throw(errMsg);
  }

}
