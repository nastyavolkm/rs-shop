import { Component, Input, OnInit } from '@angular/core';
import { IGood } from 'src/app/redux/state/good.model';

@Component({
  selector: 'app-good',
  templateUrl: './good.component.html',
  styleUrls: ['./good.component.scss']
})
export class GoodComponent implements OnInit {

  @Input() good!: IGood;

  constructor() { }

  ngOnInit(): void {
  }

}
