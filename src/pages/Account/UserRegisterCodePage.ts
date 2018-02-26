/**
 * Created by zhuzihao on 2018/2/6.
 */


import {Component, ViewChild} from '@angular/core';
import {Http,URLSearchParams} from "@angular/http";
import {Platform, NavController} from "ionic-angular";
import {ContentFieldView, ContentCodeView} from "./ContentFieldView";
import {UserRegisterPwdPage} from "./UserRegisterPwdPage";

@Component({
  selector:"register-code-page",
  templateUrl:"./UserRegisterCodePage.html",
})

export class UserRegisterCodePage{
  @ViewChild(ContentFieldView) iphoneV:ContentFieldView;
  @ViewChild(ContentCodeView)  codeV:ContentCodeView;
  baseURL:string="";
  constructor(
    private http:Http,
    private plt:Platform,
    private nav:NavController
  ) {
    this.baseURL = this.plt.url();
  }
  URLString(url:string):string{
    if(this.baseURL.indexOf("file://")  >= 0){
      return "http://smart.vr68.com/apiv1/" + url
    }else if(this.baseURL.indexOf("localhost") >= 0 ){
      return "http://smart.vr68.com/apiv1/" + url
    }else{
      return "/apiv1/" + url
    }
  }
  getCode(){
    let url = this.URLString("sys/send-code");
    let pars = new URLSearchParams();
    pars.set("mobile",this.iphoneV.content);
    pars.set("type","1");
    this.http.post(url,pars).subscribe((res)=>{
      console.log(res.json())
      if(res.ok){

      }
    })
  }
  next(){
    this.nav.push(UserRegisterPwdPage,{code:this.codeV.content,mobile:this.iphoneV.content})
  }
}
