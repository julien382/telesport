import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component'
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { LinechartComponent } from './components/linechart/linechart.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticsComponent } from './components/statistics/statistics.component';

 
@NgModule({
  declarations: [AppComponent, HeaderComponent, StatisticsComponent, HomeComponent, DetailComponent, NotFoundComponent, LinechartComponent, PiechartComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
