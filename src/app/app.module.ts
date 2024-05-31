import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { DeleteBlogComponent } from './delete-blog/delete-blog.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateStartupComponent } from './create-startup/create-startup.component';
import { ListStartupComponent } from './list-startup/list-startup.component';
import { SinglestartupComponent } from './singlestartup/singlestartup.component';
import { InvestorsListComponent } from './investors-list/investors-list.component';






const routes: Routes = [
  { path: 'register', component: RegisterFormComponent},
  { path: 'login', component: LoginFormComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'createBlog', component: CreateBlogComponent},
  { path: 'main', component: ListBlogComponent},
  { path: 'blogs/:id', component: SingleBlogComponent } ,
  { path: 'blogs/update/:id', component: UpdateBlogComponent } ,
  { path: 'blogs/delete/:id', component: DeleteBlogComponent } ,
  { path: 'startups', component: ListStartupComponent } , 
  { path: 'createStartup', component: CreateStartupComponent } ,
  { path: 'startups/:id', component: SinglestartupComponent } ,
  { path: 'investors', component: InvestorsListComponent } , 




  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    CreateBlogComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ListBlogComponent,
    SingleBlogComponent,
    UpdateBlogComponent,
    DeleteBlogComponent,
    ProfileComponent,
    CreateStartupComponent,
    ListStartupComponent,
    SinglestartupComponent,
    InvestorsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
