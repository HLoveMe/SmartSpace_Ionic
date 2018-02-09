import { Component } from '@angular/core';
import {Platform, App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SmartTabs } from "../pages/Main/MainTabs"
import {UserInfoManager, USerInfo} from "../pages/Account/UserInfoManager";
import {UserLoginPage} from "../pages/Account/UserLoginPage";
@Component({
  templateUrl: 'app.html'
})
export class SmartSpace {
  rootPage:any = null;
  private first:boolean = false;
  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private userM:UserInfoManager,
              private app:App
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.userM.userSubject.subscribe((user:USerInfo)=>{
      console.log("-=-=-=-=-=",user);
      if(user == null && !this.first){
        this.first = true;
        return;
      }
      if(user == null){
          if(this.rootPage == null){
            this.rootPage = UserLoginPage
          }else {
              let root = this.app.getRootNav().root;
              if(root instanceof SmartTabs){
                return
              }else{
                this.rootPage = UserLoginPage
              }
          }
      }else{
          if(this.rootPage == null){
            this.rootPage = SmartTabs;
            return
          }
          let root = this.app.getRootNav().root;
          if(root instanceof SmartTabs){return}else {
            this.rootPage = SmartTabs;
          }
      }
    })
  }
}

