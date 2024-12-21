import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RotaService } from '../../services/rota.service'
import { Rota } from '../../models/rota';

@Component({
  selector: 'app-lista-rotas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2 class="text-2xl font-bold mb-4">Lista de Rotas</h2>
    @if (rotas.length > 0) {
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Origem</th>
            <th class="py-2 px-4 border-b">Destino</th>
            <th class="py-2 px-4 border-b">Valor</th>
            <th class="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          @for (rota of rotas; track rota.id) {
            <tr>
              <td class="py-2 px-4 border-b">{{ rota.origem }}</td>
              <td class="py-2 px-4 border-b">{{ rota.destino }}</td>
              <td class="py-2 px-4 border-b">{{ rota.valor | currency:'BRL' }}</td>
              <td class="py-2 px-4 border-b">
                <a [routerLink]="['/rotas', rota.id, 'editar']" class="text-blue-500 hover:underline mr-2">Editar</a>
                <button (click)="excluirRota(rota.id)" class="text-red-500 hover:underline">Excluir</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    } @else {
      <p>Nenhuma rota encontrada.</p>
    }
  `
})
export class RotaListaComponent implements OnInit {
  rotas: Rota[] = [];

  constructor(private rotaService: RotaService) {}

  ngOnInit() {
    this.carregarRotas();
  }

  carregarRotas() {
    this.rotaService.getRotas().subscribe(
      (rotas) => this.rotas = rotas,
      (error) => console.error('Erro ao carregar rotas:', error)
    );
  }

  excluirRota(id: string | undefined) {
    if (id && confirm('Tem certeza que deseja excluir esta rota?')) {
      this.rotaService.deleteRota(id).subscribe(
        () => this.carregarRotas(),
        (error) => console.error('Erro ao excluir rota:', error)
      );
    }
  }
}