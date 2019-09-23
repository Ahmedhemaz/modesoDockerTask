import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input('type') type: string;
  @Input('content') content: string;
  @Input('buttonId') buttonId: string;
  constructor() { }

  ngOnInit() {
  }

}
