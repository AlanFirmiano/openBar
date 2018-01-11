import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers:[
    ApiProvider
  ]
})
export class AboutPage {
  public list_ranking:any[] = [];
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
      content: "Carregando Ranking..."
    });
    this.loader.present();
  }

  fecharCarregandoHome(){
    this.loader.dismiss();
  }

  initializeItems() {
    this.abrirCarregandoHome();
    this.apiProvider.getListRanking().subscribe(
      res=>{
        const response = (res as any);
        const objeto = JSON.parse(response._body);
        this.list_ranking = objeto;
        console.log(this.list_ranking);
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

  ionViewDidEnter() {
    this.initializeItems();
  }
}
