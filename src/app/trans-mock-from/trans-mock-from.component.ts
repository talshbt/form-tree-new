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
  transDictArr = [];
    transDict2 = {};

  treeMainDsHelper2 = [];
  form;
  form2;

  constructor() {}

 
  transDict = {
    blockSend001Data: [],
    anqnlc1wnigreretData: ["sugNigreretInt", "sugPirteyMahaduraInt"],
    blockReceive001Data: [],
    anqnlc11nigreretData: ["sugNigreretInt"],
    anqtlc1wnigreretData: ["sugNigreretInt"],
    trqra001nigreretData: []
  };


  //   transDict2 = {
  //   blockSend001Data: [],
  //   anqnlc1wnigreretData: 
  //   [
  //     {sugNigreretInt:""}, 
  //     {sugPirteyMahaduraInt: ""}
  //   ],
  //   blockReceive001Data: [],
  //   anqnlc11nigreretData: [{sugNigreretInt:""}],
  //   anqtlc1wnigreretData: [{sugNigreretInt:""}],
  //   trqra001nigreretData: []
  // };


  ngOnInit() {
    
    this.createTreeMainDs();
    this.createTransDict2();
    this.fillFormWithTreeDsData();
    this.fillFormWithTreeDsData2();

    var arr =this.form.get("anqnlc1wnigreretData") as FormArray;
  //  this.printTreeDs2()
   this.createTransDict2()

  }




  createTreeMainDs() {
    var group = {};
    var counter = 0;
    for (var parent in this.transDict) {
      var parentObj = {};
      parentObj["name"] = parent;
      if (!this.hasChildren(parent)) {
        parentObj["hasChild"] = false;
      } else {
        // var children = [];
        var childObj = {};
        parentObj["hasChild"] = true;
        for (var child in this.transDict[parent]) {
          childObj[this.transDict[parent][child]] = this.transDict[parent][
            child
          ];
        }
        parentObj["childObj"] = childObj;
      }

      this.treeMainDs.push(parentObj);
    }
   

  }


    createTreeMainDs2() {
    var group = {};
    for (var parent in this.transDict2) {
      var formArr = [];
      var parentObj = {};
      parentObj["name"] = parent;
       if (!this.hasChildren(parent)) {
        formArr.push(new FormControl(parent));
        parentObj["hasChild"] = false;
      } else {
         parentObj["hasChild"] = true;
                 for (var childObj in this.transDict2[parent]) {
                   console.log(this.transDict2[parent][childObj])
                    parentObj["childObj"] = childObj
                 }
                 this.transDictArr.push(parentObj);

      }

            

    }

    // console.log(this.transDictArr)
    // console.log(this.treeMainDs)

   

  }





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

        // console.log(this.transDict2)


        

        // console.log(Object.keys(this.transDictArr[0])[0])
        //  this.createTreeMainDs2()

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
      // console.log(parent)
      var controlObj = this.createControlObj(parent)

      let formGroup = this.addControlToFormControl(controlObj)
 
      var formArrayOfControls = this.getFormArray(parent)

      formArrayOfControls.push(new FormGroup(formGroup));
    }

   


  }
 createFormTemplate2() {
    var templateFormobj = {};
    for (var parent in this.transDict2) {
      templateFormobj[parent] = new FormArray([]);
    }
    this.form2 = new FormGroup(templateFormobj);
    // console.log(this.form2)

    
  }

    fillFormWithTreeDsData2() {
     this.createFormTemplate2();
    // console.log(this.transDict2)

    for (var parent in this.transDict2) {
      //  console.log(parent)
      //  console.log(this.transDict[parent].length)

       var controlObj = this.createControlObj2(parent)

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
        var children2 = this.treeMainDs[parent]["childObj"];


         for (var child in children2) {
          //  console.log(child)
             controlObj[child] = child;

        }
        
      }

    return controlObj;
}
createControlObj2(parent){
  var controlObj = {};
      if (!this.hasChildren(parent)) {
        controlObj[parent] = parent
      } else {

        // console.log(this.transDict2[parent])

        for (var childObj in this.transDict2[parent]) {
                  //  console.log(this.transDict2[parent][childObj])
                    // parentObj["childObj"] = childObj
                 }
        // var children2 = this.treeMainDs[parent]["childObj"];


        //  for (var child in children2) {
        //      controlObj[child] = child;

        // }
        
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
