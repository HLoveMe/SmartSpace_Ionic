/**
 * Created by zhuzihao on 2018/2/9.
 */
import {Component} from '@angular/core';
import {DeviceBoxManager, DistributionInfo, Equipment} from "../HTools/DeviceBoxManager";
import {NavController} from "ionic-angular/index";
import {DeviceGroupPage} from "./DeviceGroupPage";


@Component({
  selector:"ele-box",
  templateUrl:"./ElectricBoxPage.html"
})

export class ElectricBoxPage{
  box:DistributionInfo = null;
  constructor(
    private boxM:DeviceBoxManager,
    private nav:NavController
  ){}
  ionViewDidLoad(){
    this.boxM.boxSubject.subscribe((box)=>{
      this.box = box;
    })
  }
  deviceGroupClick(){
    //查看设备组
    this.nav.push(DeviceGroupPage)
  }
  deviceClick(equ:Equipment){
    console.log(equ)
  }
}
