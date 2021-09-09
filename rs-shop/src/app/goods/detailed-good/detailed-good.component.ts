import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { IGood } from 'src/app/redux/state/good.model';

@Component({
  selector: 'app-detailed-good',
  templateUrl: './detailed-good.component.html',
  styleUrls: ['./detailed-good.component.scss']
})
export class DetailedGoodComponent implements OnInit, OnDestroy {

  good$!: Observable<IGood | undefined>;

  subscribe!: any;

  id!: string;

  selectedImage!: string;

  selectedImageIndex!: number;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getGood();
  }

  getGood(): void {
    this.subscribe = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.good$ = this.httpService.getGoodById(this.id);
    })
  }

  onSelect(image: string, i: number): void {
    this.selectedImage = image;
    this.selectedImageIndex = i;
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

}
