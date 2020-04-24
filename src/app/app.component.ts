

import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  expArray = {
    companyName: "CNM",
    jobTitle: "Web developer II",
    yearsWorked: 3
  };


  citiesArray = {
    city1: "sf",
    city2: "um",
    city3: "mi"
  };


  dict = {
  cities: [
    {
      city1: "sf",
      city2: "um",
      city3: "mi"
    }
  ],
  "experiences": [
    {
      companyName: "CNM",
      jobTitle: "Web developer II",
      yearsWorked: 3
    }
  ]
}



  arrOfObj = []

  createForm(){
    
  }


  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.arrOfObj.push(this.expArray)
        this.arrOfObj.push(this.citiesArray)

        console.log(this.arrOfObj)

    let fg: any = {};

    for (let control in this.expArray) {

      // console.log(control)
      fg[control] = new FormControl(this.expArray[control]);
      // console.log(fg);
    }



    this.experiences.push(new FormGroup(fg));
    let fg2: any = {};

     for (let control in this.citiesArray) {

      // console.log(control)
      fg2[control] = new FormControl(this.citiesArray[control]);
      // console.log(fg2);
    }



    this.cities.push(new FormGroup(fg2));

    console.log(this.form)
  }

  form = new FormGroup({
    cities: new FormArray([]),
    experiences: new FormArray([])
  });

  get cities(): FormArray {
    return this.form.get("cities") as FormArray;
  }

  get experiences(): FormArray {
    return this.form.get("experiences") as FormArray;
  }

  addCity() {
    this.cities.push(new FormControl());
  }

  onSubmit() {
    console.log(this.cities.value); // ['SF', 'NY']
    console.log(this.form.value); // { cities: ['SF', 'NY'] }
    console.log(this.cities);
  }

  setPreset() {
    this.cities.patchValue(["LA", "MTV"]);
  }

  
}

