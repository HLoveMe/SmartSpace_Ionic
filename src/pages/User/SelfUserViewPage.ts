/**
 * Created by zhuzihao on 2018/2/8.
 */
import {Component, ViewChild, ElementRef, Renderer2} from '@angular/core';
import {PXhandle} from "../HTools/PXhandle";
import {UserInfoManager, USerInfo} from "../Account/UserInfoManager";
import {Subscription} from "rxjs/Rx";
import {NavController} from "ionic-angular/index";
import {AppSettingViewPage} from "./configs/AppSettingViewPage";
import {USerInfoShowPage} from "./users/USerInfoShowPage";


@Component({
  selector:"self-config-page",
  templateUrl:"./SelfUserViewPage.html"
})
export class SelfUserViewPage{
  @ViewChild("USerInfoView") userInfo:ElementRef;
  user:USerInfo = null;
  private dis:Subscription = null;
  items = ["配电箱账号管理","电价预设","设备报修","功能教程","说明书","设置"]
  constructor(
    private render:Renderer2,
    private pxHandle:PXhandle,
    private userM:UserInfoManager,
    private nav:NavController
  ){
  }
  ngOnInit(){
    this.render.setStyle(this.userInfo.nativeElement,"height",this.pxHandle.PXHeight(207)+"px")
    this.dis = this.userM.userSubject.subscribe((user)=>{
      this.user = user;
    })
  }
  ngOnDestroy(){
    this.dis.unsubscribe();
  }
  itemClick(index){
    if(index == 0){

    }else if(index == 1){

    }else if(index == 2){

    }else if(index == 3){

    }else if(index == 4){

    }else{
      this.nav.push(AppSettingViewPage)
    }
  }
  userInfoClick(){
    this.nav.push(USerInfoShowPage)
  }
}
