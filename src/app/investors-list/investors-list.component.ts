import { Component, OnInit } from '@angular/core';
import { StartupService } from '../startup.service';

@Component({
  selector: 'app-investors-list',
  templateUrl: './investors-list.component.html',
  styleUrls: ['./investors-list.component.css']
})
export class InvestorsListComponent implements OnInit {

  investors: any[] = [];

  constructor(private startupService: StartupService) { }

  ngOnInit(): void {
    this.getInvestors();
  }

  getInvestors(): void {
    this.startupService.getInvestors()
      .subscribe(data => {
        this.investors = data;
      }, error => {
        console.error('Error fetching investors:', error);
      });
  }
}
