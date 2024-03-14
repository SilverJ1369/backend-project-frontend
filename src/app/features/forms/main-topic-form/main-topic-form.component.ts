import { Component, Input, OnInit, ViewChild, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MainTopicService } from '../../../core/services/main-topic.service';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { Category } from '../../../shared/models/category';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-main-topic-form',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './main-topic-form.component.html',
  styleUrl: './main-topic-form.component.scss'
})
export class MainTopicFormComponent implements OnInit{
  categories: Category[] = [];

  mainTopicForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    location: new FormControl(0, [Validators.required]),
    category: new FormControl(0, [Validators.required]),
    startDate: new FormControl(0, [Validators.required]),
    endDate: new FormControl(0, [Validators.required]),
  });

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  @ViewChild(ModalComponent) modal!: ModalComponent;

  @Input() locationID!: number;
  @Input() startDateID!: number;
  @Input() endDateID!: number;


  constructor(
    private mainTopicService: MainTopicService,
    private router: Router,
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error getting categories:', error);
      }
    });
  }

  onSubmit() {
    this.mainTopicForm.value.location = this.locationID;
    this.mainTopicForm.value.startDate = this.startDateID;
    this.mainTopicForm.value.endDate = this.endDateID;
    this.mainTopicService.createMainTopic(this.mainTopicForm.value).subscribe({
      next: () => {
        console.log('Main topic created successfully!');
        this.router.navigate(['/timeline']);
      },
      error: (error) => {
        console.error('Error creating main topic:', error);
      }
    });
  }

  openLocationModal() {
    this.modal.openLocationDialog();

  }
  openStartDateModal() {
    this.modal.openStartDateDialog();
  }

  openEndDateModal() {
    this.modal.openEndDateDialog();
  }

  addCategory() {

    this.categoryService.createCategory(this.categoryForm.value).subscribe({
      next: (res) => {
        this.categories.push(res);
      },
      error: (error) => {
        console.error('Error creating category:', error);
      }
    });

  }

}
