import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public list_itens = new Array<any>();
  public idt:number;
  public name:string;
  public loader;
  public refresher;
  public isRefreshing:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiProvider:ApiProvider,
    public loadingCtrl: LoadingController
  ) {

  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.initializeItems();
  }
  abrirCarregandoHome() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Ações..."
    });
    this.loader.present();
  }

  fecharCarregandoHome(){
    this.loader.dismiss();
  }

  initializeItems() {
    this.abrirCarregandoHome();
    this.apiProvider.getListItens().subscribe(
      res=>{
        const response = (res as any);
        const objeto = JSON.parse(response._body);
        this.list_itens = objeto.data;

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
