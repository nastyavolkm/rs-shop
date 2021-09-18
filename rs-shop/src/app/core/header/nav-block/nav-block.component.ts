import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { GoodsActions } from 'src/app/redux/actions/goodsActions';
import { IToken } from '../../models/IToken.model';
import { CoreDataService } from '../../services/core-data.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-nav-block',
  templateUrl: './nav-block.component.html',
  styleUrls: ['./nav-block.component.scss']
})
export class NavBlockComponent implements OnInit {

  isSearchActive = false;

  isLogInButtonActive$$ = new BehaviorSubject(false);

  isCatalogButtonActive$$ = new BehaviorSubject(false);

  value = '';

  login$!: Observable<IToken>;

  constructor(
    public coreDataService: CoreDataService,
    private httpService: HttpService,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.isCatalogButtonActive$$ = this.coreDataService.isCatalogButtonActive$$;
    this.isLogInButtonActive$$ = this.coreDataService.isLogInButtonActive$$;
    this.login$ = this.httpService.token$;

  }

  setValueToSearch(value: string): void {
    if (value.length > 2) {
      this.coreDataService.getCategoriesByWord(value);
      this.store.dispatch(GoodsActions.getGoods( {value: value }));
    }
  }
}
