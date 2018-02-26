/**
 * Created by zhuzihao on 2018/2/5.
 */

import { Observable,Subject } from "rxjs"

import { Injectable } from '@angular/core';
import {Platform} from "ionic-angular";
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpErrorResponse, HttpHeaders, HttpParams,HttpInterceptor,HttpEvent,HttpHandler
} from "@angular/common/http";
import {UserInfoManager, USerInfo} from "../Account/UserInfoManager";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor{
  user:USerInfo = null;
  constructor(private userM:UserInfoManager) {
    this.userM.userSubject.subscribe((user)=>{
      this.user = user
    })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let reqq = req.clone({
      headers:req.headers.set("Authorization",this.user.token)
        .set("Access-Control-Allow-Origin","*")
        .set("Content-Type","application/x-www-form-urlencoded")
        .set("Access-Control-Allow-Methods","GET, POST, PUT,DELETE")
        .set("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
    });
    return  next.handle(reqq)
  }
}




export class ResponseResult{
  ok:boolean;
  result?:any;
  error?:any;
}


@Injectable()
export  class NetWork{
  private baseURL:string;
  constructor(
    private client:HttpClient,
    private plt:Platform
  ){
    this.baseURL = plt.url()
  }
  URLString(url:string):string{
    if(this.baseURL.indexOf("file://")  >= 0){
      return "http://smart.vr68.com/apiv1/" + url
    }else if(this.baseURL.indexOf("localhost") >= 0 ){
      return "/apiv1/" + url
    }else{
      return "/apiv1/" + url
    }
  }
  private parserResult(res:{string:any}){
    let status = res["res_status"] as number;
    if(status == 1){
      return {ok:true,result:res["res_body"],error:null}
    }else if(status == 0){
      return {ok:false,result:"未登入",error:null}
    }else{
      // -1 显示信息
      return {ok:false,result:res["res_msg"],error:null}
    }
  }
  private NetWork(_url:string,method:"GET" | "POST",parmars?:{[key:string]: any},header?:Headers):Observable<ResponseResult>{
    return Observable.create((sub:Subject<ResponseResult>)=>{
      //使用 HttpClient
      let url = this.URLString(_url);
      let request = null;
      let _header = header == null ? null : new HttpHeaders();
      if (method == "POST"){
        let params = new URLSearchParams();
        if (null != parmars){
          for (var one in parmars){
            params.set(one,parmars[one]);
          }
        }
        request = new HttpRequest<string>(method,url,params.toString(),{
          headers: _header,
          responseType:"json",
        });
      }else{
        //HttpParams
        let params:HttpParams = new  HttpParams()
        if (null != parmars){
          for (var one in parmars){
            params = params.set(one,parmars[one]);
          }
        }
        request = new HttpRequest<string>(method,url,{
          headers: _header,
          responseType:"json",
          params:params
        });
      }




      this.client.request(request).subscribe((event)=>{
        if ( event instanceof  HttpResponse){
          let result = (event as HttpResponse<any>).body;
          let _result = this.parserResult(result as {string:any});
          sub.next(_result as ResponseResult);
          sub.complete();
        }
      },(response:HttpErrorResponse)=>{
        console.log(response);
        sub.next({ok:false,result:null,error:response.error} as ResponseResult);
        sub.complete();
      })
    });
  }
  Get(url:string,header?:any,parms?:any):Observable<ResponseResult>{
    return this.NetWork(url,"GET",parms,header);
  }

  /**
   *  result
   *   {
   *    ok:bool,
   *    result:any,
   *    error:any
   *  }
   *  这里 已经处理error  ok 表示请求是否成功
   * */
  POST(url:string,body?:any):Observable<ResponseResult>{
    return this.NetWork(url,"POST",body);
  }
}
