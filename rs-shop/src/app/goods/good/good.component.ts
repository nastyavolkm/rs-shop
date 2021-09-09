import { Component, Input, OnInit } from '@angular/core';
import { IGood } from 'src/app/redux/state/good.model';
import { GoodsService } from '../services/goods.service';

@Component({
  selector: 'app-good',
  templateUrl: './good.component.html',
  styleUrls: ['./good.component.scss']
})
export class GoodComponent implements OnInit {

  @Input() good!: IGood;

  @Input() goods: IGood[] = [];

  @Input() selectedGoodIndex!: number;

  @Input() i!: number;

  isGoodFavorite: boolean[] = Array(this.goods.length).fill(false);

  addedToCart: boolean[] = Array(this.goods.length).fill(false);

  constructor(
    public goodsService: GoodsService
  ) { }

  ngOnInit(): void {}

  getCountOfRating(number: number): number[] {
    return Array(number);
  }

}
