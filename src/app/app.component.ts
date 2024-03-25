import { Component, NgModule } from '@angular/core';
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
  styleUrls: ['./app.component.scss', './app.header.scss', './scss/app.effects.scss', './scss/app.aside.scss'],
  
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

  toggleExpand(index: number) {
    this.isExpanded[index] = !this.isExpanded[index];
  }
  removeExpanded(index: number) {
    this.isExpanded[index] = false;
  }

  handleMouseLeave(index: number) {
    // Handle mouse leave event on the "back" element
    if (!this.isExpanded[index]) {
      // Check if not already expanded (to avoid conflict with click event)
      this.removeExpanded(index);
    }
  }

  setCategoryFilter(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'select') {
      // Handle the "Select" action, for example, resetting the category filter
      this.categoryFilter = undefined;
    } else {
      // Handle the selected category
      const selectedIndex = event.target.selectedIndex;
      this.categoryFilter = this.categories[selectedIndex - 1]; // Adjust the index because of the additional "Select" option
    }
  }
  
  
  

  setTagFilter(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'select') {
      // Handle the "Select" action, for example, resetting the tag filter
      this.tagFilter = undefined;
    } else {
      // Find the corresponding tag object based on its id
      this.tagFilter = this.tags.find(tag => tag.id === parseInt(selectedValue));
    }
  }
  
  

  clearFilters() {
    this.categoryFilter = undefined;
    this.tagFilter = undefined;
    
    // Reset the selected option in the category dropdown
    const categoryDropdown = document.getElementById('categoryDropdown') as HTMLSelectElement;
    categoryDropdown.value = 'select';
    
    // Reset the selected option in the tag dropdown
    const tagDropdown = document.getElementById('tagDropdown') as HTMLSelectElement;
    tagDropdown.value = 'select';
  }
  

  // getFilteredProjects() {
  //   if (!this.categoryFilter && !this.tagFilter) {
  //     return this.projects;
  //   }
  
  //   return this.projects.filter(project => {
  //     if (this.categoryFilter && project.category_id !== this.categoryFilter.id) {
  //       return false;
  //     }
  
  //     if (this.tagFilter && project.tags && !project.tags.some(tag => tag && tag.id === this.tagFilter?.id)) {
  //       return false;
  //     }
  
  //     return true;
  //   });
  // }

}
