import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RotaService } from '../../services/rota.service';
import { Rota } from '../../models/rota';

@Component({
  selector: 'app-consultar-melhor-rota',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './melhor-rota.component.html',
  styleUrls: ['./melhor-rota.component.css']
})
export class MelhorRotaComponent {
  consulta = { origem: '', destino: '' };
  melhorRota: Rota | null = null;

  constructor(private rotaService: RotaService) {}

  onSubmit() {
    this.rotaService.getMelhorRota(this.consulta.origem, this.consulta.destino).subscribe(
      (rota) => this.melhorRota = rota,
      (error) => {
        console.error('Erro ao consultar melhor rota:', error);
        this.melhorRota = null;
        alert('Não foi possível encontrar uma rota para os parâmetros informados.');
      }
    );
  }
}