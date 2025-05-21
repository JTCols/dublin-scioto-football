import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Register AG Grid Modules
ModuleRegistry.registerModules([AllCommunityModule]);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      AgGridModule,
      SlickCarouselModule,
      MatButtonModule,
      MatIconModule,
      NgImageSliderModule,
      MatExpansionModule,
      BrowserAnimationsModule,
      FontAwesomeModule
    )
  ]
}).catch(err => console.error(err));
