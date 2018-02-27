/**
 * Created by zhuzihao on 2018/2/5.
 */


import {Component, ViewChild} from '@angular/core';
import {UserRegisterCodePage} from "./UserRegisterCodePage";
import {UserForgetPasswordPage} from "./UserForgetPasswordPage";
import {NavController, LoadingController} from "ionic-angular/index";
import {ContentFieldView} from "./ContentFieldView";
import {UserInfoManager} from "./UserInfoManager";

@Component({
  selector:"login-page",
  templateUrl:"./UserLoginPage.html",
})

export class UserLoginPage{
  @ViewChild("Account") Account:ContentFieldView;
  @ViewChild("Password") Password:ContentFieldView;
  constructor(
    private nav:NavController,
    private loadC:LoadingController,
    private userM:UserInfoManager
  ) {}
  UserLogin(){
    let mobile = this.Account.content;
    let pwd = this.Password.content;
    if(mobile.length >= 1 && pwd.length >= 1){
      let load = this.loadC.create({
        showBackdrop:false,
        content:"登入中...",
      });
      load.present();
      this.userM.UserLogin(mobile,pwd).subscribe((ok)=>{
        load.dismiss();
        this.loadC.create({
          showBackdrop:false,
          content:ok ? "登陆成功" : "登陆失败",
          duration:0.75
        });
      })
    }
  }
  forgetPage(){
    this.nav.push(UserForgetPasswordPage)
  }
  registerUser(){
    this.nav.push(UserRegisterCodePage)
  }
}
