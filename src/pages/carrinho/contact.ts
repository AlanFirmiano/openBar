import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
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
  public loader;
  public refresher;
  public isRefreshing:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiProvider:ApiProvider,
    public loadingCtrl: LoadingController)
  {
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.initializeItems();
  }
  abrirCarregandoHome() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Ranking..."
    });
    this.loader.present();
  }

  fecharCarregandoHome(){
    this.loader.dismiss();
  }

  initializeItems() {
    this.abrirCarregandoHome();
    this.apiProvider.getListVendas().subscribe(
      res=>{
        const response = (res as any);
        const objeto = JSON.parse(response._body);
        this.list_carrinho = objeto;
        this.fecharCarregandoHome();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      },
      err=>{
        console.log(err);
        this.fecharCarregandoHome();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    );
  }

  ionViewDidLoad() {
    this.initializeItems();
  }

}
