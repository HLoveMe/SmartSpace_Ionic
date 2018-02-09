/**
 * Created by zhuzihao on 2018/2/7.
 */
import { Injectable } from '@angular/core';
import {Platform} from "ionic-angular";


@Injectable()
export  class PXhandle{
  constructor(
    private plt:Platform
  ){

  }
  PXWidth(px:number):number{
    return px / 337.0 * this.plt.width();
  }
  PXHeight(px:number):number{
    return px / 667.0 * this.plt.height()
  }
}
