/**
 * Created by zhuzihao on 2018/2/7.
 */

import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector:"[base-content-no-scroll]"
})
export class BaseContentNoScroll{
  constructor(
    private ele:ElementRef,
  ){}
  ngOnInit(){
    let scroll_ele = this.ele.nativeElement.querySelector(".scroll-content");
    scroll_ele.style.overflowY = "hidden";
  }
}
