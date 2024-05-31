import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StartupService } from '../startup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-startup',
  templateUrl: './create-startup.component.html',
  styleUrls: ['./create-startup.component.css']
})
export class CreateStartupComponent implements OnInit {

  createStartupForm!: FormGroup;

  constructor(private fb: FormBuilder, private startupService: StartupService, private router: Router) { }

  ngOnInit(): void {
    this.createStartupForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      contact: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.createStartupForm.valid) {
      const formData = this.createStartupForm.value;
      this.startupService.createStartup(formData).subscribe(
        response => {
          this.router.navigate(['/startups']);
        },
        error => {
          console.error('Error creating startup:', error);
        }
      );
    }
  }

}
