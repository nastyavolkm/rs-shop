import { Component, OnInit } from '@angular/core';
import { GoodsService } from 'src/app/goods/services/goods.service';
import { IGood } from 'src/app/redux/state/good.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  goodsForCarousel!: IGood[];

  constructor(
    private goodsService: GoodsService,
  ) { }

  ngOnInit(): void {
    this.goodsForCarousel = this.goodsService.getGoodsForSlider();
  }

}
