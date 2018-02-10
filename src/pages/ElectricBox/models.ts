/**
 * Created by zhuzihao on 2018/2/9.
 */
import {Equipment} from "../HTools/DeviceBoxManager";



//所有 设备组信息
export  class DeviceGroup{
  id:number = 0;
  count:number = 0;
  group_name:string = "";
}
//一个设备组 详细信息
export class DeviceGroupDetail{
  id:number = 0;
  group_name:string = "";
  status:number = 0;
  equipment_in:Equipment[]=[];
  equipment_out:Equipment[]=[];
}
