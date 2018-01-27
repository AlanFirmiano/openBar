import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from "../../providers/api/api";
import { ContactPage } from "../carrinho/contact";

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
  providers:[
    ApiProvider
  ]
})
export class ItemPage {
  public list_itens:any[] = [];
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
  abrirCarregandoItem() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Itens..."
    });
    this.loader.present();
  }

  fecharCarregandoItem(){
    this.loader.dismiss();
  }

  addCarinho(item:any){
    console.log("clicou no "+item.id+" : "+item.nome);
  }

  initializeItems() {
    this.abrirCarregandoItem();
    this.apiProvider.getListItens().subscribe(
      res=>{
        const response = (res as any);
        const objeto = JSON.parse(response._body);
        this.list_itens = objeto;

        this.fecharCarregandoItem();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      },
      err=>{
        console.log(err);
        this.fecharCarregandoItem();
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

  navigate(objSelecionado){
    this.navCtrl.setRoot(ContactPage, {
      item: objSelecionado
    })
  }
}
