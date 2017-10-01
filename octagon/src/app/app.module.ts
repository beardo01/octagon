import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WeekPage } from '../pages/week/week';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CreatePage } from '../pages/create/create';
import { EditPage } from '../pages/edit/edit';
import { LoginPage } from '../pages/login/login';
import { JoinPage } from '../pages/join/join';
import { ColourPage } from '../pages/colour/colour';
import { LabelPage } from '../pages/label/label';
import { IonicStorageModule } from '@ionic/storage';
import { FormatDate } from '../pipes/format-date';
import { ClearLocalStorage } from '../providers/clear-local-storage';
import { UserLocalStorage } from '../providers/user-local-storage';
import { LocalNotifications } from '@ionic-native/local-notifications';


@NgModule({
  declarations: [
    MyApp,
    CreatePage,
    EditPage,
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
    EditPage,
    WeekPage,
    SettingsPage,
    HomePage,
    TabsPage,
    LoginPage,
    JoinPage,
    ColourPage,
    LabelPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler }, 
    ClearLocalStorage, 
    UserLocalStorage, 
    LocalNotifications
  ]
})
export class AppModule { }
