/**
 * Created by zhuzihao on 2018/2/8.
 */
import {Component} from '@angular/core';
import {NavController, Platform} from "ionic-angular/index";
import {AppVersion} from "@ionic-native/app-version";
import {UserRevampPwdPage} from "./UserRevampPwdPage";
import {AppAboutViewPage} from "./AppAboutViewPage";


@Component({
  selector:"app-config",
  templateUrl:"./AppSettingViewPage.html"
})

export class AppSettingViewPage{
  items = ["修改密码","关于我们","软件版本","固件版本"];
  version:any = "1.0.0";
  constructor(
    private nav:NavController,
    private appV:AppVersion,
    private plt:Platform
  ){

  }
  ionViewDidLoad(){
    if(this.plt.is("cordova")){
      this.appV.getVersionNumber().then((ver)=>{
        this.version = ver
      })
    }
  }
  itemClick(index){
    if(index == 0){
      this.nav.push(UserRevampPwdPage)
    }else if(index == 1){
      this.nav.push(AppAboutViewPage)
    }else if(index == 2){

    }else{

    }
  }
}
