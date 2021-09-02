import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-block',
  templateUrl: './nav-block.component.html',
  styleUrls: ['./nav-block.component.scss']
})
export class NavBlockComponent implements OnInit {

  isSearchActive = false;

  value = '';

  constructor() { }

  ngOnInit(): void {
  }

}
