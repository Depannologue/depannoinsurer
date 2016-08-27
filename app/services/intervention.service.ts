import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { Intervention } from './intervention'
import {Filter} from './filter'

@Injectable()
export class InterventionService {

  constructor (private http:Http) {}

  private interventionURL = 'https://api.depannologue.dev/api/v1/interventions';


  getInterventions(filter: Filter): Observable<Array<Intervention>> {
     return this.http.get(this.buildURL(filter))
                    .map(this.extractData)
                    .catch(this.handleError);;
  }


  postIntervention (intervention: Intervention): Observable<Intervention> {
    let body = JSON.stringify({ intervention });
    console.log(body)
    console.log(body );
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.interventionURL, body, options)
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
      error._body ? `${error._body}` : 'Server error';
      return Observable.throw(errMsg);
  }

  private buildURL(filter:Filter){
    switch(filter.type){
      case "state":
        if (filter.state == "closed"){
          return this.interventionURL + "?is_in_state=" + filter.state;
        }else{
          return this.interventionURL + "?is_not_in_state=closed";
        }
      case "date":
        return this.interventionURL + "?start_date=" + filter.dateBegin + "&end_date=" + filter.dateEnd;
      case "profession":
        return this.interventionURL + "?intervention_type[profession[slug]]=" + filter.profession;
      case "state&date":
        return this.interventionURL + "?is_in_state=closed" + '&start_date=' + filter.dateBegin + '&end_date=' + filter.dateEnd;
      case "profession&date":
        return this.interventionURL + "?start_date=" + filter.dateBegin + "&end_date=" + filter.dateEnd + "&intervention_type[profession[slug]]=" + filter.profession;
      default:
        return this.interventionURL;
    }
  }


}
