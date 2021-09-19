import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/redux/state/category.model';

@Component({
  selector: 'app-nav-categories-block',
  templateUrl: './nav-categories-block.component.html',
  styleUrls: ['./nav-categories-block.component.scss'],
})
export class NavCategoriesBlockComponent {
  @Input() categories$!: Observable<ICategory[]>;
}
