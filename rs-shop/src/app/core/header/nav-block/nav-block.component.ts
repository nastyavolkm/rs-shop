import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { GoodsActions } from '../../../redux/actions/goodsActions';
import { AuthService } from '../../services/auth.service';
import { CoreDataService } from '../../services/core-data.service';

@Component({
  selector: 'app-nav-block',
  templateUrl: './nav-block.component.html',
  styleUrls: ['./nav-block.component.scss'],
})
export class NavBlockComponent implements OnInit {
  isSearchActive = false;

  isLogInButtonActive$$ = new BehaviorSubject(false);

  isCatalogButtonActive$$ = new BehaviorSubject(false);

  isCartButtonActive$$ = new BehaviorSubject(false);

  value = '';

  accountBtn!: HTMLElement;

  constructor(
    public coreDataService: CoreDataService,
    public authService: AuthService,
    private store: Store,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.isCatalogButtonActive$$ = this.coreDataService.isCatalogButtonActive$$;
    this.isLogInButtonActive$$ = this.coreDataService.isLogInButtonActive$$;
    this.isCartButtonActive$$ = this.coreDataService.isCartButtonActive$$;
  }

  setValueToSearch(value: string): void {
    if (value.length > 2) {
      this.coreDataService.getCategoriesByWord(value);
      this.store.dispatch(GoodsActions.getGoodsSearch({ value: value }));
    }
  }

  clearValue(): void {
    this.value = '';
  }
}
