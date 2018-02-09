/**
 * Created by zhuzihao on 2018/2/9.
 */
import {Component} from '@angular/core';
import {DeviceBoxManager, DistributionInfo} from "../HTools/DeviceBoxManager";


@Component({
  selector:"ele-box",
  templateUrl:"./ElectricBoxPage.html"
})

export class ElectricBoxPage{
  box:DistributionInfo = null;
  constructor(
    private boxM:DeviceBoxManager
  ){}
  ionViewDidLoad(){
    this.boxM.boxSubject.subscribe((box)=>{
      this.box = box;
    })
  }
}
