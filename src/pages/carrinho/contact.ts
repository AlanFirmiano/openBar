import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[
    ApiProvider
  ]
})
export class ContactPage {
  public list_carrinho:any[] = [];
  item:any;
  constructor(
    private navParams :NavParams,
    public navCtrl: NavController) {
    this.carregar();
  }

  adicionar(item:any){
    this.list_carrinho.push(item);
    console.log(this.list_carrinho);
  }
  carregar(){
    this.item = this.navParams.get("item");

    this.adicionar(this.item);
  }

}
