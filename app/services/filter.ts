export class Filter{
  type: string;
  dateBegin: string;
  dateEnd: string;
  state: string;
  profession: string;

  constructor(data){
    this.type = data.type;
    this.dateBegin = data.dateBegin;
    this.dateEnd = data.dateEnd;
    this.state = data.state;
    this. profession = data.profession;
  }
}
