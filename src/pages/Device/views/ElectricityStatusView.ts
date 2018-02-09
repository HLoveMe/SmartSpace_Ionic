/**
 * Created by zhuzihao on 2018/2/6.
 */
import {Component, Renderer2, ViewChild, ElementRef} from '@angular/core';
import {MainElectrtStatusInfo} from "../models/MainElectrtStatusInfo";


@Component({
  selector:"main-ele-status-view",
  templateUrl:"./ElectricityStatusView.html"
})

export  class  ElectricityStatusView{
  info:MainElectrtStatusInfo = null;
  @ViewChild("Container") container:ElementRef;
  constructor(
    private render:Renderer2
  ){
  }
  ngOnInit(){
    var myChart = echarts.init(document.getElementById('echarts_post'));
    console.log(myChart)
    var option = {
      grid: [{
        left: 20,
        right: 20,
        top:15,
        bottom:20,
      }],
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : ['周一','周二','周三','周四','周五','周六','周日',"呵呵",'周一','周二','周三','周四','周五'],
          axisLine:{
            lineStyle:{
              color:"rgba(255,255,255,1)"
            }
          },
          axisTick:{
            show:false
          }
        }
      ],
      yAxis : [
        {
          type : 'value',
          show:false,
          min:700,
          max:1400
        }
      ],
      series : [
        {
          name:'搜索引擎',
          type:'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          data:[820, 932, 901, 934, 1290,820, 932, 901, 934, 1290, 1330, 1320,1000]
        }
      ],
      dataZoom:[
        {
          show: false,
          realtime: true,
          start: 0,
          end: 56,
          zoomOnMouseWheel:true,
          moveOnMouseMove:true,
        },
        {
          type: 'inside',
          realtime: true,
          start: 0,
          end: 56,
          zoomOnMouseWheel:true,
          moveOnMouseMove:true,
        }
      ],
      geo:{
        roam:true
      }
    };
    myChart.setOption(option);
    setTimeout(()=>{
      myChart.resize()
    },1000)
  }
  setHeight(height:number){
    this.render.setStyle(this.container.nativeElement,"height",height+"px");
  }
  updateData(data:MainElectrtStatusInfo){
      this.info = data
  }
}
/**
 *

 option = {
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日',"呵呵",'周一','周二','周三','周四','周五'],
            axisLine:{
                lineStyle:{
                    color:"rgba(255,255,255,1)"
                }
            },
            axisTick:{
                show:false
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            show:false
        }
    ],
    series : [
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            data:[820, 932, 901, 934, 1290,820, 932, 901, 934, 1290, 1330, 1320,1000]
        }
    ],
    dataZoom:[
        {
            show: false,
            realtime: true,
            start: 0,
            end: 76,
            zoomOnMouseWheel:false,
            moveOnMouseMove:true,
        },
        {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 76,
            zoomOnMouseWheel:false,
            moveOnMouseMove:true,
        }
    ],
    geo:{
        roam:false
    }

};


 *
 * */
