import { NgModule } from '@angular/core';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { RotaListaComponent } from './components/rota-lista/rota-lista.component';
import { RotaCadastroComponent } from './components/rota-cadastro/rota-cadastro.component';
import { MelhorRotaComponent } from './components/melhor-rota/melhor-rota.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    RotaListaComponent,
    RotaCadastroComponent,
    MelhorRotaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
