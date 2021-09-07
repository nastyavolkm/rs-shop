import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICategory, ISelectedCategory } from 'src/app/redux/state/category.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() categories$!: Observable<ICategory[]>;

  selectedCategory!: ISelectedCategory;

  constructor(
    public router: Router
    ) { }

  ngOnInit(): void {}

  onSelect(category: ICategory): void {
    this.selectedCategory = { ...category, "isActive": true };
  }
}
