import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GoodsService } from 'src/app/goods/services/goods.service';
import { IGood } from 'src/app/redux/state/good.model';

@Component({
  selector: 'app-popular-carousel',
  templateUrl: './popular-carousel.component.html',
  styleUrls: ['./popular-carousel.component.scss']
})
export class PopularCarouselComponent {

  @Input() popularGoods!: IGood[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      760: {
        items: 1
      },
      1000: {
        items: 1
      }
    },
    nav: true
  }

  constructor(
    public goodsService: GoodsService,
    public router: Router,
    public route: ActivatedRoute,
  ) {}

}
