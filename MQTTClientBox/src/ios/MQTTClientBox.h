//
//  MQTTClientBox.h
//  HelloCordova
//
//  Created by 朱子豪 on 2018/2/26.
//

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
@interface MQTTClientBox : CDVPlugin
//开启
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
-(void)ListenMQTT:(CDVInvokedUrlCommand *)command;

@end
