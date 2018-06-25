import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trashFilter',
  pure: false
})

export class TrashPipe implements PipeTransform {

  transform(items:any[],filterdata:any): any
  {
    if (!items || !filterdata)
    {
      return items;
    }
    return items.filter(items => items.isTrash == filterdata.isTrash)
  }
}
