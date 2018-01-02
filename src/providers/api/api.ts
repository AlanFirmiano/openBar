import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  basepath = "http://localhost:8080";
  constructor(
    public http: Http
  )
  {
  }

  getListItens(){
    return this.http.get(this.basepath+"/itens");
  }

  getListVendas(){
    return this.http.get(this.basepath+"/vendas");
  }
}
