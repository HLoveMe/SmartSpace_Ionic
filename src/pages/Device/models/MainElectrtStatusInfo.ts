/**
 * Created by zhuzihao on 2018/2/7.
 */


export class MainElectrtStatusInfo{
  title:string;
  yesterday:number = 0;
  today:number = 0;
  chart:any[] = [];
  //电压
  pressure:number = 0;
  electric:number = 0;
  //温度
  temperature:number = 0;
  //漏电
  lostElectric:number = 0;
  //价格
  price:number = 0;

}
