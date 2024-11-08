import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AuthValidatorResolver } from './providers/authValidator.resolver';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthInterceptor } from './providers/auth.interceptor';
import { WishDetailsComponent } from './components/wish/wish-details/wish-details.component';
import { AddWishComponent } from './components/wish/add-wish/add-wish.component';
import { WishListComponent } from './components/wish/wish-list/wish-list.component';
import { GiftListComponent } from './components/wish/gift-list/gift-list.component';
import { AddFamilyComponent } from './components/family/add-family/add-family.component';
import { FamilyListComponent } from './components/family/family-list/family-list.component';
import { FamilyDetailsComponent } from './components/family/family-details/family-details.component';
import { RelativeWishListComponent } from './components/wish/relative-wish-list/relative-wish-list.component';
import { ProfileComponent } from './components/user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AddWishComponent,
    WishDetailsComponent,
    WishListComponent,
    GiftListComponent,
    RegisterComponent,
    LoginComponent,
    AddFamilyComponent,
    FamilyListComponent,
    FamilyDetailsComponent,
    RelativeWishListComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthValidatorResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
