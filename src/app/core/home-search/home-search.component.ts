import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { SidebarService } from '../services/sidebar.service';
import { SearchObj, SearchService } from '../services/search.service';
import { Category } from '../../shared/models/category';
import { Router } from '@angular/router';

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
    private searchService: SearchService,
    private router: Router
  ) { }


  search() {
    this.searchService.search(this.searchObj);
    this.router.navigate(['timeline'])
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
