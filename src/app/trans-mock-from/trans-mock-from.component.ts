import { Component, OnInit } from "@angular/core";

import { FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
let emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
@Component({
  selector: "app-trans-mock-from",
  templateUrl: "./trans-mock-from.component.html",
  styleUrls: ["./trans-mock-from.component.css"]
})
export class TransMockFromComponent implements OnInit {
  treeMainDs = [];

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
    
    this.createTreeMainDs();
    this.fillFormWithTreeDsData();
    console.log(this.form.controls)

    // this.getFormArray("anqnlc1wnigreretData")
    var arr =this.form.get("anqnlc1wnigreretData") as FormArray;
    console.log(arr.value[0])
    for(var item in arr.value[0]){
      console.log(item)
    }










    // console.log("-----------------this.treeMainDs:-------------")
    // console.log(this.treeMainDs)

    //     console.log("-----------------this.form:-------------")
    // console.log(this.form)


// this.displayData();
    // console.log("ngOnInit -> form")
    // console.log(this.form)
    // console.log("ngOnInit -> end")
// console.log(Object.values(this.form.controls["anqnlc1wnigreretData"].controls[0].controls).length)

  }


  displayData(){

    // for (var parent in this.treeMainDs) {
    //   var name = this.treeMainDs[parent]["name"]
    //   // console.log(name)

    //   var objectx = this.form.value[name];
    //   // console.log(objectx)
    // for(var x of objectx){
    //   var values = Object.values(x);
    //   for(var val in values){
    //     console.log(values[val])
    //   }
    // }

    // // console.log(Object.values(objectx[0]))
    //     }
  }

  createTreeMainDs() {
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

      this.treeMainDs.push(parentObj);
    }
   

  }


  createFormTemplate() {
    var templateFormobj = {};
    for (var parent of this.treeMainDs) {
      templateFormobj[parent.name] = new FormArray([]);
    }
    this.form = new FormGroup(templateFormobj);

    
  }

  fillFormWithTreeDsData() {
    this.createFormTemplate();
    for (var parent in this.treeMainDs) {
      var controlObj = this.createControlObj(parent)

      let formGroup = this.addControlToFormControl(controlObj)
 
      var formArrayOfControls = this.getFormArray(parent)

      formArrayOfControls.push(new FormGroup(formGroup));
    }

   


  }

 onSubmit() {
    // console.log(this.cities.value); // ['SF', 'NY']
    console.log(this.form.value); // { cities: ['SF', 'NY'] }
    // console.log(this.cities);
  }




createControlObj(parent){
  var controlObj = {};
      if (!this.treeMainDs[parent]["hasChild"]) {
        controlObj[this.treeMainDs[parent]["name"]] = this.treeMainDs[parent][
          "name"
        ];
      } else {
        var children = this.treeMainDs[parent]["children"];

        for (var child in children) {
          controlObj[children[child]] = children[child];
        }
      }

    return controlObj;
}

addControlToFormControl(controlObj){
  let formGroup: any = {};


      for (let control in controlObj) {
        formGroup[control] = new FormControl(controlObj[control]);
      }


      return formGroup;
}

  hasChildren(parent) {
    return this.transDict[parent].length > 0;
  }
  getFormArray(parent){
      var controlName = this.treeMainDs[parent]["name"];
      return this.form.get(controlName) as FormArray;
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
//           for(var item in this.treeMainDs){
//             var keyName = this.treeMainDs[item]['name'];

//             console.log(this.treeMainDs[item]['name'] +":")

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
//       for(var item in this.treeMainDs){
//         console.log(this.treeMainDs[item].name)
//         var arr = this.treeMainDs[item]['children'];

//         for(var child in arr){

//           console.log(arr[child])
//         }

//      }
//      console.log(this.treeMainDs)

//   }
