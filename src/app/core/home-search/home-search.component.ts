import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { SidebarService } from '../services/sidebar.service';
import { SearchObj, SearchService } from '../services/search.service';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.scss'
})
export class HomeSearchComponent implements OnInit{

  searchObj: SearchObj = {
    search_name: '',
    search_category: null,
    search_start_year: null,
    search_end_year: null
  };
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private sidebarService: SidebarService,
    private searchService: SearchService
  ) { }


  search() {
    console.log('searching for:', this.searchObj);
    this.searchService.search(this.searchObj).subscribe({
      next: (results) => {
        console.log('Search results:', results);
      }
    });
  }

  ngOnInit(): void {
    this.sidebarService.sidebarOpened.next(false);
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        console.log('categories:', this.categories);

      },
      error: (error) => {
        console.error('Error getting categories:', error);
      }
    });
  }
}
