import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WeekPage } from '../pages/week/week';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CreatePage } from '../pages/create/create';
import { LoginPage } from '../pages/login/login';
import { JoinPage } from '../pages/join/join';
import { ColourPage } from '../pages/colour/colour';
import { LabelPage } from '../pages/label/label';
import { ColoursAndLabels } from '../providers/colours-and-labels';
import { EventData } from '../providers/event-data';
import { IonicStorageModule } from '@ionic/storage';
import { LocalColoursAndLabels } from '../providers/local-colours-and-labels';
import { FormatDate } from '../pipes/format-date';

@NgModule({
  declarations: [
    MyApp,
    CreatePage,
    WeekPage,
    SettingsPage,
    HomePage,
    TabsPage,
    LoginPage,
    JoinPage,
    ColourPage,
    LabelPage,
    FormatDate
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CreatePage,
    WeekPage,
    SettingsPage,
    HomePage,
    TabsPage,
    LoginPage,
    JoinPage,
    ColourPage,
    LabelPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ColoursAndLabels, EventData, LocalColoursAndLabels ]
})
export class AppModule {}
