import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomePageComponent } from './web pages/home-page/home-page.component';
import { authGuard } from './authentication/auth.guard';
import { AddComponent } from './web pages/add/add.component';
import { DetailsComponent } from './web pages/details/details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'add', component: AddComponent, pathMatch: 'full' },
  { path: 'details/:city', component: DetailsComponent, pathMatch: 'full' },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [authGuard],
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
