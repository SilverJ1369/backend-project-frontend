import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.scss'
})
export class HomeSearchComponent implements OnInit{

  searchObj: {
    searchTerm: string;
    searchCategory: Category | null;
    searchStartYear: number | null;
    searchEndYear: number | null;
  } = {
    searchTerm: '',
    searchCategory: null,
    searchStartYear: null,
    searchEndYear: null
  };
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }


  search() {
    console.log('searching for:', this.searchObj);
    // call search service with this.searchObj
  }

  ngOnInit(): void {
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
