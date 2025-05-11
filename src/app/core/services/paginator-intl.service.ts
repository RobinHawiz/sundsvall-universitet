import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginatorIntlService implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `Första sidan`;
  itemsPerPageLabel = `Kurser per sida:`;
  lastPageLabel = `Sista sidan`;
  nextPageLabel = 'Nästa sida';
  previousPageLabel = 'Föregående sida';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Sida 1 av 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Sida ${page + 1} av ${amountPages}`;
  }
}
