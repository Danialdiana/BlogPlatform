import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public userService: UserService,private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      _id: [''],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      status: ['', [Validators.required]],

    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.userService.registerUser(this.registrationForm.value).subscribe((res) => {
        this.router.navigate(['/login']);
      });
    } else {
    }
  }

  resetForm(): void {
    this.registrationForm.reset();
  }
}
