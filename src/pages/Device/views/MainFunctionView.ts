/**
 * Created by zhuzihao on 2018/2/7.
 */
import {
  Component, ViewChild, ElementRef, Renderer2, Input, Output, EventEmitter, ViewChildren,
  QueryList
} from '@angular/core';

@Component({
  selector:"main-func-part",
  template:`
<div class="part-container" (click)="selectSelf()">
  <img [src]="'./assets/images/Home/' + icon" alt="">
  <div>{{title}}</div>
</div>`,
  styles:[`
.part-container{
   text-align: center;
}
.part-container img{
  width: 30px;
  height: 30px;
  margin-top: 15px;
}
.part-container div{
  margin-top: 3px;
  text-align: center;
}
`]
})
export class MainFunctionPartView{
  @Input() icon:string;
  @Input() title:string;
  @Input() type:number = 0;
  @Output() selectSubject:EventEmitter<number> = new EventEmitter<number>();
  constructor(){
  }
  selectSelf(){
    this.selectSubject.emit(this.type);
  }
}


@Component({
  selector:"main-func-view",
  templateUrl:'./MainFunctionView.html',
  entryComponents:[MainFunctionPartView]
})
export class MainFunctionView{
  @ViewChild("Container") container:ElementRef;
  @ViewChildren(MainFunctionPartView) parts:QueryList<MainFunctionPartView>;
  @Output() selectSubject:EventEmitter<number> = new EventEmitter<number>();

  datas = [
      [{icon:"main_0@2x.png",title:"开关控制"},{icon:"main_1@2x.png",title:"定时设置"},{icon:"main_2@2x.png",title:"用电统计"}],
      [{icon:"main_3@2x.png",title:"故障报警"},{icon:"main_4@2x.png",title:"系统消息"},{icon:"main_5@2x.png",title:"购电"}]
    ];
  constructor(
    private render:Renderer2
  ){
  }
  ngAfterViewInit(){
    this.parts.toArray().forEach((value)=>{
      value.selectSubject.subscribe((type)=>{
        this.selectSubject.emit(type)
      })
    });
  }
  setHeight(height:number){
    this.render.setStyle(this.container.nativeElement,"height",height+"px")
  }
}






