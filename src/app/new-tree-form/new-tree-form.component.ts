import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-tree-form',
  templateUrl: './new-tree-form.component.html',
  styleUrls: ['./new-tree-form.component.css']
})
export class NewTreeFormComponent implements OnInit {
  treeMainDs = [];
  transDictArr = [];
  transDict2 = {};
  form;

  transDict = {
    blockSend001Data: [],
    anqnlc1wnigreretData: ["sugNigreretInt", "sugPirteyMahaduraInt"],
    blockReceive001Data: [],
    anqnlc11nigreretData: ["sugNigreretInt"],
    anqtlc1wnigreretData: ["sugNigreretInt"],
    trqra001nigreretData: []
  };

    createTransDict2(){
        for (var parent in this.transDict) {
          var parentObj = {}
          var key = parent;
          var values = [];
         
          for(var child in this.transDict[parent]){
            var childObj = {}
            childObj[this.transDict[parent][child]] = ""
            values.push(childObj)
          }
          parentObj[key] = values;
          this.transDictArr.push(parentObj)
          this.transDict2[key] = values;

          
        }

        console.log(this.transDict2)


        

        // console.log(Object.keys(this.transDictArr[0])[0])
        //  this.createTreeMainDs2()

  }
  constructor() { }

  ngOnInit() {
    this.createTransDict2();
  }

}