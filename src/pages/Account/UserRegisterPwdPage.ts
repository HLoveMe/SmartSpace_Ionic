/**
 * Created by zhuzihao on 2018/2/6.
 */
import {Component, ViewChildren, QueryList} from '@angular/core';

import {Platform, NavParams, LoadingController} from "ionic-angular";
import {ContentFieldView} from "./ContentFieldView";

import {UserInfoManager} from "./UserInfoManager";
@Component({
  selector:"register-pwd-page",
  templateUrl:"./UserRegisterPwdPage.html",
})
export class UserRegisterPwdPage{
  @ViewChildren(ContentFieldView) contVs:QueryList<ContentFieldView>;
  constructor(
    private navP:NavParams,
    private loadC:LoadingController,
    private userM:UserInfoManager,
  ) {

  }
  register(){
    let cons = this.contVs.toArray();
    let one = cons[0];
    let two = cons[1];
    if(one.content == two.content && one.content.length >= 1){
      let load = this.loadC.create({
        content:"注册中....",
        showBackdrop:false,
      });
      load.present();
      this.userM.UserRegister(this.navP.get("mobile"),this.navP.get("code"),one.content).subscribe((ok)=>{
        load.dismiss();
        this.loadC.create({
          spinner: 'hide',
          content:ok ? "注册成功" : "注册失败",
          duration:0.75
        });
        if(ok){
          this.userM.UserLogin(this.navP.get("mobile"),one.content).subscribe(()=>{

          })
        }
      })
    }else{
      let load = this.loadC.create({
        content:"两次密码输入不一致",
        showBackdrop:false,
        duration:0.75
      });
      load.present();
    }
  }
}
