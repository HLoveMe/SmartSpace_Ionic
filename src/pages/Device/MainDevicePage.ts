/**
 * Created by zhuzihao on 2018/2/5.
 */


import {Component, ViewChild} from '@angular/core';
import {ElectricityStatusView} from "./views/ElectricityStatusView";
import {MainFunctionView} from "./views/MainFunctionView";
import {PXhandle} from "../HTools/PXhandle";
import {MainElectrtStatusInfo} from "./models/MainElectrtStatusInfo";
import {DeviceBoxManager} from "../HTools/DeviceBoxManager";
import {LoadingController} from "ionic-angular/index";


@Component({
  selector:"main-home",
  templateUrl:"./MainDevicePage.html",
})

export  class  MainDevicePage{
  @ViewChild(ElectricityStatusView) statusView:ElectricityStatusView;
  @ViewChild(MainFunctionView) funView:MainFunctionView;
  type:number = 0
  constructor(
    private pxhandle:PXhandle,
    private device:DeviceBoxManager,
    private loadC:LoadingController
  ){
  }
  ionViewDidLoad(){
    //大小设置
    this.statusView.setHeight(this.pxhandle.PXHeight(359));
    this.funView.setHeight(this.pxhandle.PXHeight(195));
    //接受事件
    this.funView.selectSubject.subscribe((type)=>{
      this.type = type
      switch (type){
        case 0:
          break
        case 1:
          break
        case 2:
          break
        case 3:
          break
        case 4:
          break
        case 5:
          break
      }
    });
    let info = new MainElectrtStatusInfo();
    info.title = "爱上无名氏";
    info.yesterday = 77;
    info.today =  99;
    info.chart = [1,2,3,4];
    info.pressure = 220.4;
    info.electric = 3.8;
    info.temperature = 24;
    info.lostElectric = 1.8;
    info.price = 0.75;
    this.statusView.updateData(info)
  }
  show(){
    this.loadC.create({
      enableBackdropDismiss:true,
      content:`
<div>
  <div>
    <ion-spinner name="bubbles"></ion-spinner>   
  </div>
  <div>sasas</div>
</div>
`
    }).present()
  }
}

