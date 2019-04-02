import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WelcomeComponent} from './home/welcome.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {AuthGuard} from './user/auth.guard';
import {SelectiveStrategyService} from './selective-strategy.service';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: 'products', loadChildren: './products/product.module#ProductModule', canActivate: [AuthGuard], data: {preload: true}},
      {path: '**', component: PageNotFoundComponent}
    ], {enableTracing: false, preloadingStrategy: SelectiveStrategyService}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
