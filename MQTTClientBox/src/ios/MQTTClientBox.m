//
//  MQTTClientBox.m
//  HelloCordova
//
//  Created by 朱子豪 on 2018/2/26.
//

#import "MQTTClientBox.h"
#import "MQTTSessionManager.h"
@interface MQTTClientBox()<MQTTSessionManagerDelegate>
@property(nonatomic,strong)MQTTSessionManager *sessionM;

@property(nonatomic,copy)NSString *host;
@property(nonatomic,assign)NSInteger port;
@property(nonatomic,assign)BOOL tls;
@property(nonatomic,assign)NSInteger keepalive;
@property(nonatomic,assign)BOOL clean;
@property(nonatomic,assign)BOOL auth;
@property(nonatomic,copy)NSString *user;
@property(nonatomic,copy)NSString *pass;
@property(nonatomic,assign)BOOL will;
@property(nonatomic,copy)NSString *willTopic;
@property(nonatomic,assign)MQTTQosLevel willQos;
@property(nonatomic,assign)BOOL willRetainFlag;
@property(nonatomic,copy)NSString *clientId;
@property(nonatomic,copy)NSString *deviceId;

@property(nonatomic,copy)NSString *callID;
@end
@implementation MQTTClientBox
- (void)connectTo:(NSString *)host
             port:(NSInteger)port
              tls:(BOOL)tls
        keepalive:(NSInteger)keepalive
            clean:(BOOL)clean
             auth:(BOOL)auth
             user:(NSString *)user
             pass:(NSString *)pass
             will:(BOOL)will
        willTopic:(NSString *)willTopic
          willMsg:(NSData *)willMsg
          willQos:(MQTTQosLevel)willQos
   willRetainFlag:(BOOL)willRetainFlag
     withClientId:(NSString *)clientId
         deviceId:(NSString *)deviceId
{
    NSString * GETBASE = [NSString stringWithFormat:@"%@/event/raw",deviceId];//接受消息
    self.sessionM.subscriptions = @{
                                    GETBASE:[[NSNumber alloc] initWithInt:MQTTQosLevelExactlyOnce]
                                    };
    
    [self.sessionM connectTo:host port:port tls:tls keepalive:keepalive clean:clean auth:auth user:user pass:pass will:will willTopic:willTopic willMsg:willMsg willQos:willQos willRetainFlag:willRetainFlag withClientId:clientId securityPolicy:nil certificates:nil protocolLevel:MQTTProtocolVersion311 connectHandler:^(NSError *error) {
        
    }];
}
-(void)ListenMQTT:(CDVInvokedUrlCommand *)command{
    self.callID = command.callbackId;
    self.sessionM = [[MQTTSessionManager alloc]init];
    self.sessionM.delegate = self;
    [self.sessionM addObserver:self forKeyPath:@"effectiveSubscriptions" options:NSKeyValueObservingOptionNew | NSKeyValueObservingOptionOld context:nil];
    
    [self.sessionM addObserver:self forKeyPath:@"state" options:NSKeyValueObservingOptionNew | NSKeyValueObservingOptionOld context:nil];
    NSArray *args = command.arguments;
    
    self.host = args[0];
    self.port = [args[1] integerValue];
    self.tls = [args[2] boolValue];
    self.keepalive = [args[3] integerValue];
    self.clean =  [args[4] boolValue];
    self.auth =  [args[5] boolValue];
    self.user = args[6];
    self.pass = args[7];
    self.will = [args[8] boolValue];
    self.willTopic = args[9];
    self.willQos = [args[10] integerValue];
    self.willRetainFlag = [args[11] boolValue];
    self.clientId = args[12];
    self.deviceId = args[13];
    
    [self connectTo:self.host port:self.port  tls:self.tls keepalive:self.keepalive clean:self.clean auth:self.auth user:self.user pass:self.pass will:self.will willTopic:self.willTopic willMsg:nil willQos:self.willQos willRetainFlag:self.willRetainFlag withClientId:self.clientId deviceId:self.deviceId];
}
-(void)addObserver:(NSObject *)observer forKeyPath:(NSString *)keyPath options:(NSKeyValueObservingOptions)options context:(void *)context{
    
}
- (void)handleMessage:(NSData *)data onTopic:(NSString *)topic retained:(BOOL)retained{
    NSDictionary *result=  [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:nil];
    if(result){
        CDVPluginResult * _result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:result];
        [_result setKeepCallbackAsBool:YES];
        [self.commandDelegate sendPluginResult:_result callbackId:self.callID];
        return;
    }
    CDVPluginResult * _result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"解析结果错误"];
    [_result setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:_result callbackId:self.callID];
}
@end
