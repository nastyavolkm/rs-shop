import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { GoodsActions } from 'src/app/redux/actions/goodsActions';
import { CoreDataService } from '../../services/core-data.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-nav-block',
  templateUrl: './nav-block.component.html',
  styleUrls: ['./nav-block.component.scss']
})
export class NavBlockComponent implements OnInit {

  isSearchActive = false;

  isButtonActive$$ = new BehaviorSubject(false);

  value = '';

  constructor(
    public coreDataService: CoreDataService,
    private httpService: HttpService,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.isButtonActive$$ = this.coreDataService.isButtonActive$$;
  }

  setValueToSearch(value: string): void {
    if (value.length > 2) {
      this.coreDataService.getCategoriesByWord(value);
      this.store.dispatch(GoodsActions.getGoods( {value: value }));
    }
  }
}
