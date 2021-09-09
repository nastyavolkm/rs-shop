import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(
      array: any[],
      option: string,
      pathStrPrice: string[],
      pathStrPopular: string[],
      directionAsc: boolean,
  ): any[] {
    let pathStr: string[] = [];

    if (option === 'price') {
      pathStr = pathStrPrice;
    } else if (
      option === 'popular') {
      pathStr = pathStrPopular;
    }

    array.sort((a: any, b: any) => {
      const el1 = pathStr.reduce((acc, key) => acc[key], a);
      const el2 = pathStr.reduce((acc, key) => acc[key], b);
      if ((el1) < (el2)) {
          return -1;
      }
      if ((el1) > (el2)) {
          return 1;
      }
      return 0;
  });
      if (directionAsc === true) {
          array.reverse();
      }
      return [...array];
  }
}
