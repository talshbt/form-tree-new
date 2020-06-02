import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-tree',
  templateUrl: './create-tree.component.html',
  styleUrls: ['./create-tree.component.css']
})
export class CreateTreeComponent implements OnInit {


 data = {
    transactions: [
      {
        transName: "",
        addressLines: [
          {
            addressLine: "",
          }
        ]
      }
    ]
  }

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: [''],
      transactions: this.fb.array([])
    })

    this.settransactions();
  }

  onSubmit() {
    alert(this.myForm.value);
  }

  addNewTrans() {
    let control = <FormArray>this.myForm.controls.transactions;
    control.push(
      this.fb.group({
        transName: [''],
        addressLines: this.fb.array([])
      })
    )
  }

  deletetransName(index) {
    let control = <FormArray>this.myForm.controls.transactions;
    control.removeAt(index)
  }

  addNewAddressLine(control) {
    control.push(
      this.fb.group({
        addressLine: ['']
      }))
  }

  deleteAddressLine(control, index) {
    control.removeAt(index)
  }

  settransactions() {
    let control = <FormArray>this.myForm.controls.transactions;
    this.data.transactions.forEach(x => {
      control.push(this.fb.group({ 
        transName: x.transName, 
        addressLines: this.setAddressLines(x) }))
    })
  }

  setAddressLines(x) {
    let arr = new FormArray([])
    x.addressLines.forEach(y => {
      arr.push(this.fb.group({ 
        addressLine: y.addressLine 
      }))
    })
    return arr;
  }
  ngOnInit() {
  }

}