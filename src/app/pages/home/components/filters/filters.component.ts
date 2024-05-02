import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { StoreService } from '../../../../services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatListModule],
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit, OnDestroy {
  constructor(private storeService: StoreService) { }

  @Output() showCategory = new EventEmitter<string>()

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getAllCategories().subscribe((response) => {
      this.categories = response
    })
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe()
    }
  }

  categoriesSubscription: Subscription | undefined
  categories: Array<string> | undefined

  onShowCategory(category: string): void {
    this.showCategory.emit(category)
  }
}
