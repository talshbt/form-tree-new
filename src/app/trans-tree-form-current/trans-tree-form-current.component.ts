import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trans-tree-form-current',
  templateUrl: './trans-tree-form-current.component.html',
  styleUrls: ['./trans-tree-form-current.component.css']
})
export class TransTreeFormCurrentComponent implements OnInit {


form2;
transDict2 = {
  "blockSend001Data": [
    {
      "blockSend001Data": ""
    }
  ],
 
  "anqnlc11nigreretData": [
  
    {
      "fillerStr": ""
    },
    {
      "simanSofNigreretStr": ""
    }
  ],
  "trqra002nigreretData": [
    {
      "trqra002nigreretData": ""
    }
  ],
  
  "anc1OrderData": [
    {
      "anc1OrderData": ""
    }
  ]
}
  constructor() { }

  ngOnInit() {
  }

}