import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICategory, ISelectedCategory } from 'src/app/redux/state/category.model';
import { CoreDataService } from '../../services/core-data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() categories$!: Observable<ICategory[]>;

  selectedCategory!: ISelectedCategory;

  constructor(
    private store: Store,
    private coreDataService: CoreDataService
    ) { }

  ngOnInit(): void {}

  onSelect(category: ICategory): void {
    this.selectedCategory = { ...category, "isActive": true };
  }
}
