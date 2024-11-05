import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomePageComponent } from './web pages/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddCardComponent } from './web pages/add-card/add-card.component';
import { WeatherCardComponent } from './web pages/weather-card/weather-card.component';
import { AddComponent } from './web pages/add/add.component';
import { DetailsComponent } from './web pages/details/details.component';
import { UiService } from './services/ui.service';
import { provideHttpClient } from '@angular/common/http';
import { WeatherService } from './services/weather.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomePageComponent,
    AddCardComponent,
    WeatherCardComponent,
    DetailsComponent,
    AddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // Required animations module
    ToastrModule.forRoot({
      positionClass: 'toast-top-center', // Customize the position
      timeOut: 3000, // Duration for which the toast is displayed
      closeButton: true, // Show close button
      progressBar: true, // Show progress bar
    }),
  ],
  providers: [
    UiService,
    WeatherService,
    provideHttpClient(), // Add the provideHttpClient function here
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
