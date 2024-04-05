import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import project from '../data/projects.json';
import tags from '../data/tags.json';
import categories from '../data/categories.json';
// import { randomChar, initCoords, update, draw, animate, startAnimation, hover } from './animation-functions';


// Remove local declarations for animation functions

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
  styleUrls: ['./scss/style.scss'],
})
export class AppComponent {
  title = 'Alex Aguilar Portfolio';
  date = new Date();
  author = "Alex";
  categories = categories;
  tags = tags;
  projects = project;
  categoryFilter: Category | undefined;
  tagFilter: Tag | undefined;
  isExpanded = Array(this.projects.length).fill(false);

  constructor(private renderer: Renderer2) {}

  toggleExpand(index: number) {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  removeExpanded(index: number) {
    this.isExpanded[index] = false;
  }

  handleMouseLeave(index: number) {
    if (this.isExpanded[index]) {
      this.removeExpanded(index);
    }
  }

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

  // ngOnInit() {
  //   this.startAnimation();
  // }

  // startAnimation() {
  //   const canvas = this.renderer.createElement('canvas');
  //   canvas.id = 'canvas';
  //   this.renderer.appendChild(document.body, canvas);
  
  //   const height = window.innerHeight;
  //   const width = window.innerWidth;
  //   canvas.height = height;
  //   canvas.width = width;
  
  //   randomChar(); // Using imported function
  //   initCoords(); // Using imported function
  
  //   animate(); // Using imported function
  //   startAnimation(); // Using imported function
  // }

}
