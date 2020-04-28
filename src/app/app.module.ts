import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TransMockFromComponent } from './trans-mock-from/trans-mock-from.component';
import { NewTreeFormComponent } from './new-tree-form/new-tree-form.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, HelloComponent, TransMockFromComponent, NewTreeFormComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
