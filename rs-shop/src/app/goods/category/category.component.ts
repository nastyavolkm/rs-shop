import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { ICategory } from 'src/app/redux/state/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  category$!: Observable<ICategory | undefined>;

  subscribe!: any;

  id!: string;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.subscribe = this.route.params.subscribe((params) => {
      this.id = params.id;
      this.category$ = this.httpService.getCategoryById(this.id);
    });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
