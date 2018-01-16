import { Component } from '@angular/core';

import { AboutPage } from '../ranking/about';
import { ContactPage } from '../carrinho/contact';
import {ItemPage} from "../item/item";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ItemPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
