import { Component, OnInit } from '@angular/core';
import { StartupService } from '../startup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-startup',
  templateUrl: './list-startup.component.html',
  styleUrls: ['./list-startup.component.css']
})
export class ListStartupComponent implements OnInit {

  startups: any[] = [];
  filteredStartups: any[] = [];
  searchQuery: string = '';
  isSearchActive: boolean = false;
  searchResults: any[] = [];

  constructor(private startupService: StartupService, private router: Router) {}

  ngOnInit(): void {
    this.getStartupList();
  }
  
  getStartupList(): void {
    this.startupService.getStartups()
      .subscribe(data => {
        console.log('Received startups:', data);
        this.startups = data;
        this.filteredStartups = data; // Инициализируем filteredStartups здесь
      }, error => {
        console.error('Error fetching startups:', error);
      });
  }

  onSearchInputChange(): void {
    this.applySearch();
  }

  applySearch(): void {
    console.log('Applying search with query:', this.searchQuery);
    this.filteredStartups = this.startups.filter(startup =>
      startup.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      startup.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.isSearchActive = this.searchQuery.length > 0;
    console.log('Filtered startups:', this.filteredStartups);
  }

  goToSingleStartup(id: string): void {
    this.router.navigate(['/startups', id]);
  }
}
