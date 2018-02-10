/**
 * Created by zhuzihao on 2018/2/9.
 */
import {Component} from '@angular/core';
import {NetWork, ResponseResult} from "../HTools/URLFactory";
import {NavParams, NavController, LoadingController} from "ionic-angular/index";
import {DeviceGroup, DeviceGroupDetail} from "./models";
import {SelectDevicePage} from "./SelectDevicePage";
import {DeviceBoxManager, DistributionInfo, Equipment} from "../HTools/DeviceBoxManager";

@Component({
  selector:"create-group",
  templateUrl:"./CreateDeviceGroupPage.html"
})
export class CreateDeviceGroupPage{
  title:string = '';
  group:DeviceGroup = null;
  groupDetail:DeviceGroupDetail = null;
  box:DistributionInfo = null;

  name:string = "";
  operation:Equipment[] = [];
  constructor(
    private network:NetWork,
    private navP:NavParams,
    private nav:NavController,
    private deviceM:DeviceBoxManager,
    private loadC:LoadingController
  ){
    this.group = this.navP.get("group");
    if(this.group != null){
      this.name = this.group.group_name;
      this.title = "设置设备分组";
      this.network.Get("group/group-info",{"id":this.group.id}).subscribe((res:ResponseResult)=>{
        console.log(res);
        if(res.ok){
          this.groupDetail = res.result;
          this.operation = this.groupDetail.equipment_in;
        }
      })
    }else{
      this.title = "新建设备分组";
      this.deviceM.boxSubject.subscribe((box)=>{
        this.box = box;
      })
    }
  }
  saveGroup(){
    if(this.group == null){
      if(this.name.length < 1){
        this.loadC.create({
          content:"输入组名",
          showBackdrop:false,
          enableBackdropDismiss:false,
          spinner:"hide"
        }).present();
        return
      }
      //创建
      let ids = this.operation.map((v)=>{
        return v.equipment_id
      }).join(",");
      let load = this.loadC.create({
        content:"创建中",
        showBackdrop:false,
        enableBackdropDismiss:false
      });
      load.present();
      this.network.POST("group/add-group",{group_name:this.name,equipment_ids:ids}).subscribe((res:ResponseResult)=>{
        load.dismiss();
        this.loadC.create({
          content:res.ok ? "创建成功" : "创建失败",
          showBackdrop:false,
          enableBackdropDismiss:false,
          duration:0.75,
          spinner:"hide"
        }).present();
        this.nav.pop();
        this.deviceM.upload();
      })
    }else{
      //配置
      let addids = this.operation.filter((v,index)=>{
       let one = this.groupDetail.equipment_in.filter((u)=>{
          return v.equipment_id == u.equipment_id
        }).pop();
        return one == null;
      }).join(",");

      let reids = this.groupDetail.equipment_in.filter((v)=>{
        let one = this.operation.filter((u)=>{
          return v.equipment_id == u.equipment_id
        }).pop();
        return one == null;
      });
      let load = this.loadC.create({
        content:"操作中",
        showBackdrop:false,
        enableBackdropDismiss:false
      });
      this.network.POST("group/edit-equipment",{
        "id":this.group.id,
        "equipment_ids_in":addids,
        "equipment_ids_out":reids
      }).subscribe((res:ResponseResult)=>{
        load.dismiss();
        this.loadC.create({
          content:res.ok ? "操作成功" : "操作失败",
          showBackdrop:false,
          enableBackdropDismiss:false,
          duration:0.75,
          spinner:"hide"
        }).present();
        this.nav.pop();
      })
    }
  }
  removeEqu(index:number){
    this.operation =  this.operation.filter((v,_index)=>{
      return index != _index
    })
  }
  addEquiments() {
    let equs = this.box.equipments.filter((V)=>{
      var con = false;
      this.operation.map((U)=>{
        if(U.equipment_id == V.equipment_id){
          con = true
        }
      });
      return !con;
    });

    this.nav.push(SelectDevicePage, {equs: equs}).then(()=>{
      this.nav.last().onWillDismiss((data)=>{
        if(data!=null){
            this.operation = this.operation.concat(data);
        }
      })
    })
  }
}
