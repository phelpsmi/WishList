import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishDetailsComponent } from './components/wish/wish-details/wish-details.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import {  HandleLoginGuard, HandleVisitorGuard, RootRedirect } from './services/token-storage.service';
import { AddFamilyComponent } from './components/family/add-family/add-family.component';
import { AddWishComponent } from './components/wish/add-wish/add-wish.component';
import { WishListComponent } from './components/wish/wish-list/wish-list.component';
import { FamilyDetailsComponent } from './components/family/family-details/family-details.component';
import { FamilyListComponent } from './components/family/family-list/family-list.component';
import { AuthValidatorResolver } from './providers/authValidator.resolver';
import { RelativeWishListComponent } from './components/wish/relative-wish-list/relative-wish-list.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { GiftListComponent } from './components/wish/gift-list/gift-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', canActivate: [RootRedirect], children: []},
      { path: 'auth', canActivate: [HandleVisitorGuard], children: [
        { path: 'register', canActivate: [HandleVisitorGuard], component: RegisterComponent },
        { path: 'login', canActivate: [HandleVisitorGuard], component: LoginComponent },
      ]},
      { path: 'profile', canActivate: [HandleLoginGuard], component: ProfileComponent},
      { path: 'wish', canActivate: [HandleLoginGuard], children: [
        { path: 'add', component: AddWishComponent },
        { path: 'self', component: WishListComponent },
        { path: 'gifts', component: GiftListComponent },
        { path: 'all', component: RelativeWishListComponent },
        { path: ':id', component: WishDetailsComponent }
      ]},
      { path: 'family', canActivate: [HandleLoginGuard], children: [
        { path: 'add', component: AddFamilyComponent },
        { path: 'all', component: FamilyListComponent },
        { path: ':id', component: FamilyDetailsComponent }
      ]}
    ],
    resolve: {
      auth: AuthValidatorResolver
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
