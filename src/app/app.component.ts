import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(private localNotifications: LocalNotifications, private fcm: FCM, public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.initializeApp();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //FCm Push notification
      this.fcm.getToken().then(token => {
        console.log('fcm-token',token);
        //backend.registerToken(token);
      });
      
      this.fcm.onNotification().subscribe(data => {
        if(data.wasTapped){
          console.log(data);
          console.log("Received in background");
        } else {
          console.log(data);
          console.log("Received in foreground");
          // Schedule a single notification
          this.localNotifications.schedule({
            title: data.title,
            text: data.body,
            foreground: true
          });
        };
      });
    });
  }
}
