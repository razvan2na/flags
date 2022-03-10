import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryIndexComponent } from '../components/country-index/country-index.component';
import { CountryEditComponent } from '../components/country-edit/country-edit.component';
import { CountryAddComponent } from '../components/country-add/country-add.component';
import { LoginComponent } from '../components/authentication/login/login.component';
import { RegisterComponent } from '../components/authentication/register/register.component';
import { HomeComponent } from '../components/home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { ForbiddenComponent } from '../components/forbidden/forbidden.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { AdminGuard } from '../guards/admin.guard';
import { UserIndexComponent } from '../components/user-index/user-index.component';
import { UserDetailsComponent } from '../components/user-details/user-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'countries/index', component: CountryIndexComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'countries/add', component: CountryAddComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'countries/:code', component: CountryEditComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'users/index', component: UserIndexComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'users/:email', component: UserDetailsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '404', component: NotfoundComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
