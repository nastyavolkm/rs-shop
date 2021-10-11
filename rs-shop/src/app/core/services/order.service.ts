import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { IDetail } from 'src/app/cart/cart/models/IDetail.model';
import { IOrder } from 'src/app/cart/cart/models/IOrder.model';
import { IOrderItem } from 'src/app/cart/cart/models/IOrderItem.model';
import { IToken } from 'src/app/core/models/IToken.model';
import { IUnLoggedUser } from 'src/app/core/models/IUnLoggedUser.model';
import { IUser } from 'src/app/core/models/IUser.model';
import { UserActions } from 'src/app/redux/actions/userActions';
import { UserSelectors } from 'src/app/redux/selectors/userSelectors';
import { IGood } from 'src/app/redux/state/good.model';
import { AuthService } from './auth.service';

const USERS = 'users';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  details!: IDetail;

  isOrderSubmitted$$ = new BehaviorSubject(false);

  constructor(private http: HttpClient, private store: Store, private authService: AuthService) {}

  addToList(id: string, list: string): void {
    const token = this.getCurrentToken();
    if (token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token.token}` });
      const body = {
        id: id,
      };
      this.http.post(`${USERS}/${list}`, body, { headers }).subscribe();
    } else {
      const currentUser = this.authService.getUnLoggedUser();
      if (list === 'cart') {
        currentUser!.cart!.push(id);
      } else {
        currentUser!.favorites!.push(id);
      }
      this.authService.saveUnLoggedUser(currentUser!);
    }
  }

  deleteFromList(id: string, list: string): void {
    let params = new HttpParams().set('id', id);
    const token = this.getCurrentToken();
    if (token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token.token}` });
      this.http.delete(`${USERS}/${list}`, { headers, params }).subscribe();
      this.store.dispatch(UserActions.getUser({ token: token }));
    } else {
      const currentUser = this.authService.getUnLoggedUser();
      let newList;
      if (list === 'cart') {
        newList = currentUser!.cart;
      } else {
        newList = currentUser!.favorites;
      }
      newList?.splice(newList.indexOf(id), 1);
      this.authService.saveUnLoggedUser(currentUser!);
    }
  }

  transferDataOfUnloggedUser(token: IToken): void {
    const unLoggedUser = this.authService.getUnLoggedUser();
    if (unLoggedUser) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token.token}` });
      const favorites = unLoggedUser?.favorites;
      const cart = unLoggedUser?.cart;
      forkJoin(
        favorites!.forEach((id) => {
          const body = {
            id: id,
          };
          this.http.post(`${USERS}/favorites`, body, { headers }).subscribe();
        }),
      );
      forkJoin(
        cart!.forEach((id) => {
          const body = {
            id: id,
          };
          this.http.post(`${USERS}/cart`, body, { headers }).subscribe();
        }),
      );
    }
  }

  getCurrentToken(): IToken | undefined {
    const currentToken = localStorage.getItem('token');
    if (typeof currentToken === 'string') {
      return JSON.parse(currentToken);
    }
    return undefined;
  }

  getCurrentLoggedUser(): Observable<IUser> {
    return this.store.pipe(select(UserSelectors.user));
  }

  getOrders(user$: Observable<IUser>): Observable<IOrder[]> {
    return user$.pipe(map((user) => user.orders));
  }

  getGoodsFromOrder(orderItem: IOrder): Observable<IGood[]> {
    const goods$ = of(orderItem).pipe(
      switchMap((order) => {
        return forkJoin(order.items.map((item) => this.http.get<IGood>(`goods/item/${item.id}`)));
      }),
    );
    return goods$;
  }

  getCountOfRating(number: number): number[] {
    return Array(number);
  }

  isFavorite(
    user$: Observable<IUser | IUnLoggedUser | undefined>,
    goodId: string,
  ): Observable<boolean> {
    return user$.pipe(
      switchMap((user) => {
        const result = user?.favorites?.find((id) => id === goodId);
        if (!result) return of(false);
        else {
          return of(true);
        }
      }),
    );
  }

  addedToCart(
    user$: Observable<IUser | IUnLoggedUser | undefined>,
    goodId: string,
  ): Observable<boolean> {
    return user$.pipe(
      switchMap((user) => {
        const result = user?.cart?.find((id) => id === goodId);
        if (!result) return of(false);
        else {
          return of(true);
        }
      }),
    );
  }

  onLikeClick(isGoodFavorite: boolean, id: string): boolean {
    if (isGoodFavorite) {
      isGoodFavorite = false;
      this.deleteFromList(id, 'favorites');
    } else {
      isGoodFavorite = true;
      this.addToList(id, 'favorites');
    }
    return isGoodFavorite;
  }

  getListGoods(
    user$: Observable<IUser | IUnLoggedUser | undefined>,
    list: string,
  ): Observable<IGood[]> {
    const goods$ = user$.pipe(
      switchMap((user) => {
        let newList;
        if (list === 'cart') {
          newList = user!.cart;
        } else {
          newList = user?.favorites;
        }

        return forkJoin(newList!.map((id) => this.http.get<IGood>(`goods/item/${id}`)));
      }),
    );
    return goods$;
  }

  getCommonPrice(price: number, amount: number): Observable<number> {
    return of(price * amount);
  }

  getLoggedUser(): Observable<IUser> {
    return this.store.pipe(select(UserSelectors.user));
  }

  submitOrder(orderForm: FormGroup, user$: Observable<IUser>): void {
    const token = this.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token!.token}` });
    let ids: string[] = [];
    user$.pipe(tap((user) => (ids = user.cart))).subscribe();
    const goodsToOrder: IOrderItem[] = ids.map((item) => {
      const obj: IOrderItem = { id: item, amount: 0 };
      return Object.assign({}, obj);
    });
    const body = {
      items: goodsToOrder,
      details: orderForm.value,
    };
    this.details = body.details;
    this.http.post(`${USERS}/order`, body, { headers }).subscribe();
  }

  editOrder(orderForm: FormGroup, id: string): void {
    const token = this.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token!.token}` });
    const body = {
      id: id,
      details: orderForm.value,
    };
    this.details = body.details;
    this.http.put(`${USERS}/order`, body, { headers }).subscribe();
  }

  deleteOrder(id: string): void {
    const token = this.getCurrentToken();
    if (token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token.token}` });
      this.http.delete(`${USERS}/order?id=${id}`, { headers }).subscribe();
      this.store.dispatch(UserActions.getUser({ token: token }));
    }
  }

  getOrderPrice(goods$: Observable<IGood[]>): Observable<number> {
    return goods$.pipe(map((goods) => goods.map((good) => good.price).reduce((a, b) => a + b)));
  }

  afterOrderSubmitted(): void {
    this.isOrderSubmitted$$.next(true);
  }
}
