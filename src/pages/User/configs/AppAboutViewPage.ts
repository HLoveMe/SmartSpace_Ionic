/**
 * Created by zhuzihao on 2018/2/8.
 */
import {Component} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
@Component({
  selector:"app-about",
  templateUrl:"./AppAboutViewPage.html"
})

export class AppAboutViewPage{
  safeS:SafeHtml = null;
  constructor(
    private sanitizer:DomSanitizer
  ){
    this.safeS = this.sanitizer.bypassSecurityTrustHtml("<div style='text-align: center'>关于我们</div>")
  }
}
