import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Product[], filterText: string): Product[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "";
    if (filterText) {
      let filteredProducts = value.filter((p) => p.productName.toLocaleLowerCase().indexOf(filterText) !== -1);
      return filteredProducts;
    }
    return value;
  }

}
