import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {

  @Input('type') type: string;
  @Input('inputFieldId') inputFieldId: string;
  @Input('placeHolder') placeHolder: string;
  @Input('name') name: string;
  @Input('controlName') formControlChild: FormControl;
  @Input('controlGroup') formGroupChild: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
