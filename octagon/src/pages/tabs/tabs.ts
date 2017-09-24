import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { WeekPage } from '../week/week';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = WeekPage;
  tab3Root: any = SettingsPage;

  constructor() {

  }
}
