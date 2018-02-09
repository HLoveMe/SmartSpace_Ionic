/**
 * Created by zhuzihao on 2018/2/5.
 */

import { Component } from '@angular/core';
import {MainDevicePage} from "../Device/MainDevicePage"
import {SelfUserViewPage} from "../User/SelfUserViewPage";
import {ElectricBoxPage} from "../ElectricBox/ElectricBoxPage";


@Component({
  templateUrl:"./MainTabs.html"
})
export  class SmartTabs{
  home = MainDevicePage
  box = ElectricBoxPage
  ele = MainDevicePage
  user = SelfUserViewPage
  constructor(){}
}
