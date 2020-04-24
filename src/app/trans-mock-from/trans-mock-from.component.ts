import { Component, OnInit } from "@angular/core";

import { FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
let emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
@Component({
  selector: "app-trans-mock-from",
  templateUrl: "./trans-mock-from.component.html",
  styleUrls: ["./trans-mock-from.component.css"]
})
export class TransMockFromComponent implements OnInit {
  treeArrObjects = [];

  form;

  constructor() {}

 
  transDict = {
    blockSend001Data: [],
    anqnlc1wnigreretData: ["sugNigreretInt", "sugPirteyMahaduraInt"],
    blockReceive001Data: [],
    anqnlc11nigreretData: ["sugNigreretInt"],
    anqtlc1wnigreretData: ["sugNigreretInt"],
    trqra001nigreretData: []
  };


  ngOnInit() {
    this.createTreeArrObjects();

    this.fillForm();

    console.log("-----------------this.treeArrObjects:-------------")
    console.log(this.treeArrObjects)
  }

  createTreeArrObjects() {
    var group = {};
    var counter = 0;
    for (var parent in this.transDict) {
      var formArr = [];
      var parentObj = {};
      parentObj["name"] = parent;
      if (!this.hasChildren(parent)) {
        formArr.push(new FormControl(parent));
        parentObj["hasChild"] = false;
      } else {
        var children = [];
        var childObj = {};
        parentObj["hasChild"] = true;
        for (var child in this.transDict[parent]) {
          formArr.push(new FormControl(this.transDict[parent][child]));
          childObj[this.transDict[parent][child]] = this.transDict[parent][
            child
          ];
          children.push(this.transDict[parent][child]);
        }
        parentObj["children"] = children;
        parentObj["childObj"] = childObj;
      }

      this.treeArrObjects.push(parentObj);
    }
  }
  hasChildren(parent) {
    return this.transDict[parent].length > 0;
  }

  createFormTemplate() {
    var formGroup = {};
    var arr = [];
    var obj = {};
    for (var x of this.treeArrObjects) {
      obj[x.name] = new FormArray([]);
    }
    this.form = new FormGroup(obj);
  }

  fillForm() {
    this.createFormTemplate();
    for (var item in this.treeArrObjects) {
      var obj = {};
      if (!this.treeArrObjects[item]["hasChild"]) {
        obj[this.treeArrObjects[item]["name"]] = this.treeArrObjects[item][
          "name"
        ];
      } else {
        var arr = this.treeArrObjects[item]["children"];

        for (var child in arr) {
          obj[arr[child]] = arr[child];
        }
      }

      let fg: any = {};


      for (let control in obj) {
        fg[control] = new FormControl(obj[control]);
      }
      var name = this.treeArrObjects[item]["name"];
      var fa = this.form.get(name) as FormArray;

      fa.push(new FormGroup(fg));
    }
  }
}

//   printForm(){

//      console.log(this.form)

//     // for(var i =0; i < Object.values(this.form.controls).length; ++i){
//     //   console.log(Object.keys(this.form.controls)[i])
//     //   var formArray:any = (Object.values(this.form.controls)[i])

//     //        console.log(formArray.value)
//     // }
// // Object.values(this.form.controls).forEach(x=>{
// //   console.log(x.value)
// // })
//     // console.log(Object.values(this.form.controls))
// //  for(var item in this.form.controls){
// //       console.log(Object.values(item))
// //     }

//   }

//   printFormKeys(){
//     Object.keys(this.form.controls).forEach(key=>{
//       console.log(key)
//     })
//   }

//   printChildrenObjects(){
//           for(var item in this.treeArrObjects){
//             var keyName = this.treeArrObjects[item]['name'];

//             console.log(this.treeArrObjects[item]['name'] +":")

//             var arr = Object.values(this.childrentObjects1[keyName])
//             arr.forEach(value =>{
//               console.log(value)

//             })

//           }

//             console.log(this.form)

//   }

//   printObj(obj){
//       for(var key in obj){
//        console.log("key :" + key)
//        console.log("value : ")

//        console.log(obj[key])
//      }

//   }

//    printTreeArr(){
//       for(var item in this.treeArrObjects){
//         console.log(this.treeArrObjects[item].name)
//         var arr = this.treeArrObjects[item]['children'];

//         for(var child in arr){

//           console.log(arr[child])
//         }

//      }
//      console.log(this.treeArrObjects)

//   }
