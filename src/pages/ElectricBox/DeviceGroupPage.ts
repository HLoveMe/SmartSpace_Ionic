/**
 * Created by zhuzihao on 2018/2/9.
 */
import {Component} from '@angular/core';
import {NetWork,ResponseResult} from "../HTools/URLFactory";
import {NavController, LoadingController} from "ionic-angular/index";
import {CreateDeviceGroupPage} from "./CreateDeviceGroupPage";
import {DeviceGroup} from "./models";


@Component({
  selector:"device-group-list",
  templateUrl:"./DeviceGroupPage.html"
})

export class DeviceGroupPage{
  group:DeviceGroup[] = [];
  constructor(
    private network:NetWork,
    private nav:NavController,
    private loadC:LoadingController
  ){}
  ionViewDidEnter(){
    this.network.Get("group/index").subscribe((res:ResponseResult)=>{
      this.group = res.result.group as DeviceGroup[];
    })
  }
  createGroup(){
      this.nav.push(CreateDeviceGroupPage);
  }

  editGroup(item:DeviceGroup){
    this.nav.push(CreateDeviceGroupPage,{group:item});
  }
  removeGroup(index:number){
    this.network.POST("group/del-group",{"id":this.group[index].id}).subscribe((res:ResponseResult)=>{
      this.loadC.create({
        content:res.ok ? "操作成功" : "操作失败",
        showBackdrop:false,
        enableBackdropDismiss:false,
        spinner:"hide",
        duration:0.75
      }).present();
    });
    this.group = this.group.filter((v,_index)=>{
      return _index != index
    });

  }
}
