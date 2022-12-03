import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListPgComponent } from './views/category-list-pg/category-list-pg.component';
import { StatusListPgComponent } from './views/status-list-pg/status-list-pg.component';
import { UserFormPgComponent } from './views/user-list-pg/user-form-pg/user-form-pg.component';
import { UserListPgComponent } from './views/user-list-pg/user-list-pg.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-list', pathMatch: 'full' },
  { path: 'status-list', component: StatusListPgComponent },
  { path: 'category-list', component: CategoryListPgComponent },
  { path: 'user-list', component: UserListPgComponent },
  { path: 'user-form', component: UserFormPgComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
