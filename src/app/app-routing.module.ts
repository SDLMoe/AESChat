import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EncryptionComponent } from './encryption/encryption.component';

const routes: Routes = [
  { path: '', redirectTo: '/encryption', pathMatch: 'full'},
  { path: 'encryption', component: EncryptionComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
