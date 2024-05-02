import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-products-header',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './products-header.component.html'
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>()
  @Output() itemsCountChange = new EventEmitter<number>()
  @Output() sortChange = new EventEmitter<string>()

  sort = 'desc'
  itemsCount = 12

  onSortUpdated(newSort: string): void {
    this.sort = newSort
    this.sortChange.emit(newSort)
  }

  onItemsUpdated(count: number): void {
    this.itemsCount = count
    this.itemsCountChange.emit(count)
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum)
  }
}
