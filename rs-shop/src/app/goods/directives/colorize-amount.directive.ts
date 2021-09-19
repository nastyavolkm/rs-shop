import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColorizeAmount]',
})
export class ColorizeAmountDirective {
  @Input() amount!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    const className =
      this.amount < 5
        ? 'red'
        : this.amount >= 5 && this.amount <= 19
        ? 'yellow'
        : this.amount > 19
        ? 'green'
        : 'none';
    this.renderer.addClass(this.el.nativeElement, className);
  }
}
