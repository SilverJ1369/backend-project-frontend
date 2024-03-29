import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../shared/models/category';
import { MainTopicService } from '../../../core/services/main-topic.service';
import { MainTopic } from '../../../shared/models/main-topic';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TimesuckEpisodeService } from '../../../core/services/timesuck-episode.service';

@Component({
  selector: 'app-timesuck-episode-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './timesuck-episode-form.component.html',
  styleUrl: './timesuck-episode-form.component.scss'
})
export class TimesuckEpisodeFormComponent implements OnInit{

  categories: Category[] = [];
  mainTopics: MainTopic[] = [];

  constructor(
    private categoryService: CategoryService,
    private mainTopicService: MainTopicService,
    private timesuckEpisodeService: TimesuckEpisodeService) { }

  timesuckEpisodeForm = new FormGroup({
    episode_number: new FormControl('', Validators.required),
    main_topic_id: new FormControl(null, Validators.required),
    category_id: new FormControl(0, Validators.required),
  });


  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error getting categories:', error);
      }
    });
    this.mainTopicService.getMainTopics().subscribe({
      next: (mainTopics: MainTopic[]) => {
        this.mainTopics = mainTopics;
        console.log(this.mainTopics);
      }
    })
  }

  onSubmit() {
    console.log('Form submitted:', this.timesuckEpisodeForm.value);
    this.timesuckEpisodeService.createTimesuckEpisode(this.timesuckEpisodeForm.value).subscribe({
      next: (res) => {
        console.log('Timesuck episode created:', res);
      },
      error: (error) => {
        console.error('Error creating timesuck episode:', error);
      }
    });
  }

}
