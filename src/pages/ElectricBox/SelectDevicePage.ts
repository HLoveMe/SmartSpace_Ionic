/**
 * Created by zhuzihao on 2018/2/10.
 */
import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular/index";
import {Equipment} from "../HTools/DeviceBoxManager";

@Component({
  selector:"add-device",
  templateUrl:"./SelectDevicePage.html"
})
export class SelectDevicePage{
  equs:Equipment[] = [];
  private _equs:{[key:number]:boolean} ={};
  constructor(
    private navP:NavParams,
    private viewC:ViewController,
  ){}
  ionViewDidLoad(){
    this.equs = this.navP.get("equs");
    this.equs.map((v,index)=>{
      this._equs[index] = false;
    })
  }
  Sure(){
    let res = this.equs.filter((va,index)=>{
      return this._equs[index]
    });
    this.viewC.dismiss(res);
  }
  select(index:number){
    this._equs[index] = !this._equs[index];
  }
}
