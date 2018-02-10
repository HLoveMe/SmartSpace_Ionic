/**
 * Created by zhuzihao on 2018/2/9.
 */

import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/Rx";
import {NetWork, ResponseResult} from "./URLFactory";

//一个设备简单信息
export class Equipment{
  equipment_id:number = 0;
  is_default:number = 0;
  name:string = "";
}
//用户设备组信息
export class DistributionInfo{
  equipments:Equipment[];
  group_count:number = 0
}


@Injectable()
export class DeviceBoxManager{
  boxSubject:BehaviorSubject<DistributionInfo> = new BehaviorSubject<DistributionInfo>(null);
  defaultDeviceSubject:BehaviorSubject<Equipment> = new BehaviorSubject<Equipment>(null);
  private info:DistributionInfo = null;
  constructor(
    private network:NetWork
  ){
    this.upload();
  }
  upload(){
    this.network.Get("equipment/index").subscribe((res:ResponseResult)=>{
      this.info = res.result as DistributionInfo;
      this.boxSubject.next(this.info);
      let current = this.info.equipments.filter((value)=>{
        return value.is_default == 1;
      }).pop();
      this.defaultDeviceSubject.next(current);
    })
  }
}
