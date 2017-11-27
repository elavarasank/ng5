import { Component, OnInit } from '@angular/core';
import{ trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import {DataService} from '../data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
        trigger('goalAnimate',[
          transition('* => *',[
            query(':enter',style({opacity:0}),{optional:true}),
            query(':enter',stagger('300ms',[
              animate('.6s ease-in',keyframes([
                style({opacity:0,transform:'translateY(-75%)',offset:0}),
                style({opacity:.5,transform:'translateY(35px)',offset:0.3}),
                style({opacity:1,transform:'translateY(0)',offset:1}),
              ]))
            ]),{optional:true}),
            query(':leave',stagger('300ms',[
              animate('.6s ease-in',keyframes([
                style({opacity:1,transform:'translateY(0)',offset:0}),
                style({opacity:.5,transform:'translateY(35px)',offset:0.3}),
                style({opacity:0,transform:'translateY(-75%)',offset:1}),
              ]))
            ]),{optional:true})
          ])
        ])
  ]
  /*template:`<p style="color:green">elavarasan<p>`,
  styles:[`
  p{font-weight:bold}
  div{color:green}`]*/
})
export class HomeComponent implements OnInit {
  itemCount:number;
  getIndex:number;
  btnText:string="Add an item";
  goalText:string="My first life goal";
  goals=[];
  constructor(private _data:DataService) { }
  ngOnInit() {
    
    this._data.goal.subscribe(res=>this.goals=res);
    this._data.changeGoal(this.goals);
    this.itemCount=this.goals.length;

  }
  addItem(){
    if(this.goalText!=""){
      if(this.goals.indexOf(this.goalText)==-1){
        if(this.goalText.length<=75){
          this.goals.push(this.goalText);
          this.goalText="";
          this.itemCount=this.goals.length;
          this._data.changeGoal(this.goals);
        }
      }
    }
  }
  removeItem(getIndex){
     this.goals.splice(getIndex,1);
     this.itemCount=this.goals.length;
     this._data.changeGoal(this.goals);
     //if(this.itemCount==0){
      //this.goalText="My first life goal";
     //}
  }
 }
