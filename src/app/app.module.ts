import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SmartSpace } from './app.component';
import { SmartTabs } from "../pages/Main/MainTabs"
import { MainDevicePage } from "../pages/Device/MainDevicePage"
import { NetWork, AuthorizationInterceptor} from "../pages/HTools/URLFactory"
import { UserLoginPage } from "../pages/Account/UserLoginPage"
import { UserInfoManager } from "../pages/Account/UserInfoManager"
import {ContentFieldView,ContentCodeView} from "../pages/Account/ContentFieldView";
import {UserRegisterCodePage} from "../pages/Account/UserRegisterCodePage";
import {UserForgetPasswordPage} from "../pages/Account/UserForgetPasswordPage";
import {UserRegisterPwdPage} from "../pages/Account/UserRegisterPwdPage";
import {ElectricityStatusView} from "../pages/Device/views/ElectricityStatusView";
import {MainFunctionView, MainFunctionPartView} from "../pages/Device/views/MainFunctionView";
import {PXhandle} from "../pages/HTools/PXhandle";
import {BaseContentNoScroll} from "../pages/HTools/IonContentNoScroll";
import {SelfUserViewPage} from "../pages/User/SelfUserViewPage";
import {AppSettingViewPage} from "../pages/User/configs/AppSettingViewPage";
import {AppVersion} from "@ionic-native/app-version";
import {UserRevampPwdPage} from "../pages/User/configs/UserRevampPwdPage";
import {AppAboutViewPage} from "../pages/User/configs/AppAboutViewPage";
import {USerInfoShowPage} from "../pages/User/users/USerInfoShowPage";
import {DeviceBoxManager} from "../pages/HTools/DeviceBoxManager";
import {ElectricBoxPage} from "../pages/ElectricBox/ElectricBoxPage";
import {DeviceGroupPage} from "../pages/ElectricBox/DeviceGroupPage";
import {CreateDeviceGroupPage} from "../pages/ElectricBox/CreateDeviceGroupPage";
import {SelectDevicePage} from "../pages/ElectricBox/SelectDevicePage";
import {ElectricityViewPage} from "../pages/Electricity/ElectricityViewPage";
import {MQTTManager} from "../pages/HTools/MQTTManager";


@NgModule({
  declarations: [
    SmartSpace,SmartTabs,BaseContentNoScroll,
    UserLoginPage,ContentFieldView,ContentCodeView,UserRegisterCodePage,UserForgetPasswordPage,UserRegisterPwdPage,
    MainDevicePage,ElectricityStatusView,MainFunctionView,MainFunctionPartView,

    ElectricBoxPage,DeviceGroupPage,CreateDeviceGroupPage,SelectDevicePage,

    SelfUserViewPage,AppSettingViewPage,UserRevampPwdPage,AppAboutViewPage,
    USerInfoShowPage,ElectricityViewPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(SmartSpace,{
      backButtonText:"",
      backButtonIcon:"md-arrow-round-back"
    }),
    HttpClientModule,HttpModule,
    IonicStorageModule.forRoot({
      name:"SmartSpacedb",
      driverOrder:["websql","sqlite","indexeddb"]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SmartSpace,SmartTabs,
    UserLoginPage,ContentFieldView,ContentCodeView,UserRegisterCodePage,UserForgetPasswordPage,UserRegisterPwdPage,
    MainDevicePage,ElectricityStatusView,MainFunctionView,

    ElectricBoxPage,DeviceGroupPage,CreateDeviceGroupPage,SelectDevicePage,

    SelfUserViewPage,AppSettingViewPage,UserRevampPwdPage,AppAboutViewPage,
    USerInfoShowPage,ElectricityViewPage,


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NetWork,UserInfoManager,
    {provide:HTTP_INTERCEPTORS,useClass:AuthorizationInterceptor,multi:true},
    PXhandle,AppVersion,DeviceBoxManager
  ]
})
export class AppModule {}
