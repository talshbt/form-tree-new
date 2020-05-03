import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
@Component({
  selector: 'app-new-tree-form',
  templateUrl: './new-tree-form.component.html',
  styleUrls: ['./new-tree-form.component.css']
})
export class NewTreeFormComponent implements OnInit {
;
  transDict2 = {};
  dsHelper = {}
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



  ngOnInit() {

    this.createTransDict2();
    this.fillFormWithTreeDsData2();

    // var arr = this.form2.get("anqnlc1wnigreretData") as FormArray;

    // // console.log(this.transDict2)
    // console.log(this.transDict2['anqnlc1wnigreretData'].length)


     

  }




  createTransDict2() {
    for (var parent in this.transDict) {
      var parentObj = {};
      var key = parent;
      var values = [];
      // console.log(this.hasChildren(parent))

      for (var child in this.transDict[parent]) {
        var childObj = {};
        childObj[this.transDict[parent][child]] = "";
        values.push(childObj);
      }
  
      this.transDict2[key] = values;
      
    }
  }


  createFormTemplate2() {
    var templateFormobj = {};
    for (var parent in this.transDict2) {
      templateFormobj[parent] = new FormArray([]);
    }
    this.form2 = new FormGroup(templateFormobj);
    console.log(this.form2);
  }



  fillFormWithTreeDsData2() {
    this.createFormTemplate2();
    for (var parent in this.transDict2) {
      var controlObj = this.createControlObj2(parent);

      let formGroup = this.addControlToFormControl2(controlObj);

      var formArrayOfControls = this.getFormArray2(parent);

      formArrayOfControls.push(new FormGroup(formGroup));
    }
  }


  createControlObj2(parent) {
    var controlObj = {};
    if (!this.hasChildren(parent)) {
      controlObj[parent] = parent;
    } else {
      for (var childObj in this.transDict2[parent]) {
        var child = Object.keys(this.transDict2[parent][childObj])[0];

        controlObj[child] = child;
      }
    }
    return controlObj;
  }

 

  addControlToFormControl2(controlObj) {
    let formGroup: any = {};

    for (let control in controlObj) {
      formGroup[control] = new FormControl(controlObj[control]);
    }

    return formGroup;
  }



  getFormArray2(parent) {
    var controlName = parent;
    return this.form2.get(controlName) as FormArray;
  }

  onSubmit() {
    console.log(this.form2.value); 
  }

  hasChildren(parent) {
    return this.transDict[parent].length > 0;
  }

}