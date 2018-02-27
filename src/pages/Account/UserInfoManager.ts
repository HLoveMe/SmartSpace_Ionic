/**
 * Created by zhuzihao on 2018/2/5.
 */
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs"
import { Storage } from "@ionic/storage"
import {Platform} from "ionic-angular";
import {Http,URLSearchParams,Headers} from "@angular/http";
export class USerInfo{
  user_id:string;
  token:string;
  headimgurl:string;
  name:string;
  mobile:string;

  province:number = 0;
  city:number = 0;
  district:number = 0;

  p_name:string;
  c_name:string;
  d_name:string;
  default_equipment:string
}


@Injectable()
export class UserInfoManager{
  user:USerInfo = null;
  private userKey:string = "UserKey";
  public userSubject:BehaviorSubject<USerInfo> = new BehaviorSubject(null);
  private baseURL:string;
  constructor(
    private storge:Storage,
    private plt:Platform,
    private http:Http,
  ){
    this.baseURL = plt.url();
    this.storge.ready().then(()=>{
        this.storge.get(this.userKey).then((user)=>{
          this.user = user as USerInfo;
          this.userSubject.next(this.user);
        })
    })
  }
  URLString(url:string):string{
    if(this.baseURL.indexOf("file://")  >= 0){
      return "http://smart.vr68.com/apiv1/" + url
    }else if(this.baseURL.indexOf("localhost") >= 0 ){
      return "http://smart.vr68.com/apiv1/" + url
    }else{
      return "/apiv1/" + url
    }
  }
  UserRegister(account:string,code:string,pwd:string):Observable<boolean>{
    return Observable.create((obs:Subject<boolean>)=>{
      let pars = new URLSearchParams();
      pars.set("mobile",account);
      pars.set("password",pwd);
      pars.set("code",code);
      this.http.post(this.URLString("sys/register"),pars).toPromise()
        .then((res)=>{
          obs.next(res.ok);
          obs.complete();
        });
    })
  }
  UserLogin(account:string,pwd:string):Observable<boolean>{
      return Observable.create((obs:Subject<boolean>)=>{
        let pars = new URLSearchParams();
        pars.set("mobile",account);
        pars.set("password",pwd);
        this.http.post(this.URLString("sys/login"),pars).toPromise()
          .then((res)=>{
            if(res.ok){
              this.user = res.json().res_body as  USerInfo;
              setTimeout(()=>{
                this.userSubject.next(this.user);
              },1000);
              this.uploadLoadAllInfo();
              //保存
              this.storge.set(this.userKey,this.user);
            }
            obs.next(res.ok);
            obs.complete();
          });
      })
  }

  uploadLoadAllInfo(){
    let pars = new URLSearchParams();
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin","*");
    headers.append("Content-Type","application/x-www-form-urlencoded");
    headers.append("Access-Control-Allow-Headers","x-requested-with,content-type");
    headers.append("Access-Control-Allow-Methods","POST");
    headers.append("Authorization",this.user.token);
    this.http.post(this.URLString("user/info"),pars,{headers:headers}).toPromise()
      .then((res)=>{
        if(!res.ok){return}
        let _result = res.json().res_body;
        this.user.headimgurl = _result["headimgurl"];
        this.user.name = _result["name"];
        this.user.mobile = _result["mobile"];
        this.user.default_equipment = _result["default_equipment"];

        this.user.province = _result["province"];
        this.user.city = _result["city"];
        this.user.district = _result["district"];

        this.user.p_name = _result["p_name"];
        this.user.c_name = _result["c_name"];
        this.user.d_name = _result["d_name"];
        this.userSubject.next(this.user);
        //保存
        this.storge.set(this.userKey,this.user);
      });
  }

}
