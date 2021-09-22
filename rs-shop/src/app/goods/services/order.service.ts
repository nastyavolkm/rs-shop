import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IToken } from 'src/app/core/models/IToken.model';
import { IUnLoggedUser } from 'src/app/core/models/IUnLoggedUser.model';
import { IUser } from 'src/app/core/models/IUser.model';
import { IGood } from 'src/app/redux/state/good.model';

const USERS = 'users';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

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

  getCurrentToken(): IToken | undefined {
    const currentToken = localStorage.getItem('token');
    if (typeof currentToken === 'string') {
      return JSON.parse(currentToken);
    }
    return undefined;
  }

  getFavoriteGoods(user$: Observable<IUser | IUnLoggedUser | undefined>): Observable<IGood[]> {
    const goods$ = user$.pipe(
      switchMap((user) => {
        return forkJoin(user!.favorites!.map((id) => this.http.get<IGood>(`goods/item/${id}`)));
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
}
