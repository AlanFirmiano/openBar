import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  list_itens:any[] = [];
  item:any;
  constructor(
    private navParams :NavParams,
    public navCtrl: NavController) {
    this.carregar();
  }

  adicionar(item:any){
    this.list_itens.push(item);
    console.log(this.list_itens);
  }
  carregar(){
    this.item = this.navParams.get("item");

    this.adicionar(this.item);
  }

}
