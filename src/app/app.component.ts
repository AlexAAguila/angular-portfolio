import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import project from '../data/projects.json';
import tags from '../data/tags.json';
import categories from '../data/categories.json';


export class Category {
  id!: number;
  name!: string;
  slug!: string;
}

export class Tag {
  id!: number;
  name!: string;
  slug!: string;
  pivot?: any;
}

export class Project {
  'id': number;
  'title': string;
  'slug': string;
  'excerpt': string;
  'body': string;
  'url': string | null;
  'published_date': string | null;
  'image': string | null;
  'thumb': string | null;
  'category_id': number | null;
  'created_at': string;
  'updated_at': string;
  'category': Category | null;
  'tags': Tag[] | undefined;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  
})
export class AppComponent {
  title = 'portfolio-homepage';
  date = new Date();
  author = "Alex";
  categories = categories;
  tags = tags;
  projects = project;
  categoryFilter: Category | undefined;
  tagFilter: Tag | undefined;


  setCategoryFilter(categories: Category) {
    this.categoryFilter = categories;
  }

  setTagFilter(tags: Tag) {
    this.tagFilter = tags;
  }

  clearFilters() {
    this.categoryFilter = undefined;
    this.tagFilter = undefined;
  }

}
