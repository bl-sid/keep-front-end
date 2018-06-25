import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {

  transform(items: any[], filterdata: any):any
  {
    if (!items || !filterdata)
    {
      return items
    }
    return items.filter(items => items.isPin == filterdata.isPin && items.isArchive==0 && items.isTrash==0)
  }

}
