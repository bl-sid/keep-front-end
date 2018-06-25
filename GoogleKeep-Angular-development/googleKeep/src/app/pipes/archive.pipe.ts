import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'archiveFilter',
  pure: false
})

export class ArchivePipe implements PipeTransform
{
  transform(items: any[], filterdata: any): any
  {
    if (!items || !filterdata)
    {
      return items;
    }
    return items.filter(items=>items.isArchive==filterdata.isArchive)
  }
}
