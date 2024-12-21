import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RotaListaComponent } from './components/rota-lista/rota-lista.component';
import { RotaCadastroComponent } from './components/rota-cadastro/rota-cadastro.component';
import { MelhorRotaComponent } from './components/melhor-rota/melhor-rota.component';

export const routes: Routes = [
  { path: '', redirectTo: '/rotas', pathMatch: 'full' },
  { path: 'rotas', component: RotaListaComponent },
  { path: 'rota/Novo', component: RotaCadastroComponent },
  { path: 'rota/:id', component: RotaCadastroComponent },
  { path: 'melhor-rota', component: MelhorRotaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


