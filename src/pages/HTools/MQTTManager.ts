
/**
 * Created by zhuzihao on 2018/2/26.
 */

import {Observable, Subject} from "rxjs/Rx";
class _MQTTManager{
  USER:string = "admin";
  PASSWORD:string = "password";
  HOST:string = "39.108.80.183";
  PORT:number = 61613;
  constructor(){
  }
  /**
   host:(NSString *)host
   port:(NSInteger)port
   tls:(BOOL)tls
   keepalive:(NSInteger)keepalive
   clean:(BOOL)clean
   auth:(BOOL)auth
   user:(NSString *)user
   pass:(NSString *)pass
   will:(BOOL)will
   willTopic:(NSString *)willTopic
   willQos:(MQTTQosLevel)willQos
   willRetainFlag:(BOOL)willRetainFlag
   withClientId:(NSString *)clientId
   deviceId:(NSString *)deviceId
   */
  listenMQTT(clientId:string,deviceid:string):Observable<any>{
    let navigator = navigator;
    if(navigator && navigator.MQTTClientBox){
      return Observable.create((obs:Subject<any>)=>{
        navigator.MQTTClientBox.listenMqtt(this.HOST,this.PORT,false,60,true,true,this.USER,this.PASSWORD,false,"",0,false,clientId,deviceid).then((res)=>{
          obs.next(res);
        },(err)=>{
          obs.error(err);
        })
      })
    }
  }
}

export const MQTTManager = new _MQTTManager();
