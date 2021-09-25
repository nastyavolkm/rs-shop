import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { IDetail } from 'src/app/cart/cart/models/IDetail.model';
import { IOrder } from 'src/app/cart/cart/models/IOrder.model';
import { IOrderItem } from 'src/app/cart/cart/models/IOrderItem.model';
import { IToken } from 'src/app/core/models/IToken.model';
import { IUnLoggedUser } from 'src/app/core/models/IUnLoggedUser.model';
import { IUser } from 'src/app/core/models/IUser.model';
import { UserSelectors } from 'src/app/redux/selectors/userSelectors';
import { IGood } from 'src/app/redux/state/good.model';

const USERS = 'users';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  details!: IDetail;

  constructor(private http: HttpClient, private store: Store) {}

  addToFavorite(id: string): void {
    const token = this.getCurrentToken();
    if (token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token.token}` });
      const body = {
        id: id,
      };
      this.http.post(`${USERS}/favorites`, body, { headers }).subscribe();
    }
  }

  deleteFromFavorite(id: string): void {
    const token = this.getCurrentToken();
    if (token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token.token}` });
      this.http.delete(`${USERS}/favorites?id=${id}`, { headers }).subscribe();
    }
  }

  addToCart(id: string): void {
    const token = this.getCurrentToken();
    if (token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token.token}` });
      const body = {
        id: id,
      };
      this.http.post(`${USERS}/cart`, body, { headers }).subscribe();
    }
  }

  deleteFromCart(id: string): void {
    const token = this.getCurrentToken();
    if (token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token.token}` });
      this.http.delete(`${USERS}/cart?id=${id}`, { headers }).subscribe();
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

  getFavoriteGoods(user$: Observable<IUser | IUnLoggedUser | undefined>): Observable<IGood[]> {
    const goods$ = user$.pipe(
      switchMap((user) => {
        return forkJoin(user!.favorites!.map((id) => this.http.get<IGood>(`goods/item/${id}`)));
      }),
    );
    return goods$;
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
      this.deleteFromFavorite(id);
    } else {
      isGoodFavorite = true;
      this.addToFavorite(id);
    }
    return isGoodFavorite;
  }

  getCartGoods(user$: Observable<IUser | IUnLoggedUser | undefined>): Observable<IGood[]> {
    const goods$ = user$.pipe(
      switchMap((user) => {
        return forkJoin(user!.cart!.map((id) => this.http.get<IGood>(`goods/item/${id}`)));
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
    let obj: IOrderItem = { id: '', amount: 0 };
    let ids: string[] = [];
    user$.pipe(tap((user) => (ids = user.cart))).subscribe();
    const goodsToOrder: IOrderItem[] = ids.map((id) => {
      obj.id = id;
      return obj;
    });
    const body = {
      items: goodsToOrder,
      details: orderForm.value,
    };
    this.details = body.details;
    this.http.post(`${USERS}/order`, body, { headers }).subscribe();
  }

  getOrderPrice(goods$: Observable<IGood[]>): Observable<number> {
    return goods$.pipe(map((goods) => goods.map((good) => good.price).reduce((a, b) => a + b)));
  }
}
