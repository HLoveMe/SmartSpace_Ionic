/**
 * Created by zhuzihao on 2018/2/6.
 */

import {Component, Input, EventEmitter,Output} from '@angular/core';



@Component({
  selector:"content-view",
  template:`
<div class="content-container">
   <div class="content-icon">
     <img [src]="iconSrc" alt="icon" class="icon">
   </div>
   <div class="content-input" [style.marginRight.px]=" filedType >= 1 ? 40 : 0">
    <ion-input [placeholder]="placeholder" [clearInput]="true" [clearOnEdit] = "true"
                [type]="keyType"
                [(ngModel)]="content"
    >
    
    </ion-input>
   </div>
   <div class="content-pwd" *ngIf="filedType >= 1" (click)="keyTypeChange($event)">
    <img [src]="accIconSrc" alt="icon" class="icon">
   </div>
</div>
`,
  styles:[`
    .content-container{
        height: 40px;
        position: relative;
        /*border:1px solid red;*/
        border-bottom: 0.55px solid #999999;
    }
    
    .content-icon{
      height: 100%;
      float: left;
      width: 40px;
      display: flex;
      display: inline-flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
    }
    .content-input{
      height: 100%;
      margin-left: 50px;
    }
    .content-pwd{
      position: absolute;
      width: 40px;
      height: 40px;
      top: 0;
      right: 0;
      display: flex;
      display: inline-flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
    }
    
    .content-icon .icon{
      width: 25px;
      height: 25px;
    }
    .content-pwd .icon{
      width: 18px;
      height: 12px;
    }
`]

})

export class  ContentFieldView{
  @Input() content:string = ""
  @Input() set type(_type:number){
    this.filedType = _type;
    let _src = "./assets/images/Account/";
    if(_type == 0){
        _src += "iphone_icon";
        this.placeholder = "请输入登陆账号";
        this.keyType = "number"
    }else if(_type == 1){
      _src += "password_icon";
      this.placeholder = "输入登录密码";
      this.keyType = "password"
    }else if(_type == 2){
      _src += "rePassword";
      this.placeholder = "确认输入密码";
      this.keyType = "password"
    }else if(_type == 4){
      _src += "password_icon";
      this.placeholder = "输入旧密码";
      this.keyType = "password"
    }
    this.iconSrc = _src + "@2x.png";
    this.accIconSrc  = "./assets/images/Account/password_nor@2x.png";
  }

  filedType:number = 0;
  iconSrc:string = "";
  placeholder:string = "";
  keyType:string = "text";
  accIconSrc:string = "";
  constructor(){

  }
  keyTypeChange(event:Event){
    this.keyType = (this.keyType == "text") ? "password" : "text";
    if(this.keyType == "password"){
      this.accIconSrc = "./assets/images/Account/password_nor@2x.png"
    }else{
      this.accIconSrc = "./assets/images/Account/password@2x.png"
    }
  }
}

export class ContentFieldViewType{
  static iPhoneNumber:number = 0;
  static PassWord:number = 1;
  static rePassWord:number = 2;
  static AuthCode:number = 3;
  static oldPassword:number = 4;
}


@Component({
  selector:"content-code",
  template:`
<div class="content-container">
   <div class="content-icon">
     <img src="./assets/images/Account/code_icon@2x.png" alt="icon" class="icon">
   </div>
   <div class="content-input">
    <ion-input [placeholder]="'请输入验证码'" [clearInput]="true" [clearOnEdit] = "true"
                type="number"
                [(ngModel)]="content"
    >
    
    </ion-input>
   </div>
   <div class="content-pwd" (click)="codeEventHandle()">
      获取验证码
   </div>
</div>
`,
  styles:[`
    .content-container{
        height: 40px;
        position: relative;
        /*border:1px solid red;*/
        border-bottom: 0.55px solid #999999;
    }
    
    .content-icon{
      height: 100%;
      float: left;
      width: 40px;
      display: flex;
      display: inline-flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
    }
    .content-input{
      height: 100%;
      margin-left: 50px;
      margin-right: 120px;
    }
    .content-pwd{
      position: absolute;
      width: 100px;
      height: 35px;
      top: 0;
      right: 0;
      background-color: #1E8CF0;
      text-align: center;
      line-height: 35px;
    }
    
    .content-icon .icon{
      width: 25px;
      height: 25px;
    }
`]

})

export  class ContentCodeView{
  content:string = "";
  @Output() getCode = new EventEmitter();
  constructor(){}
  codeEventHandle(){
    this.getCode.emit()
  }
}
