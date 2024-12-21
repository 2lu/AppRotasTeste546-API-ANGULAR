import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RotaService } from '../../services/rota.service';
import { Rota } from '../../models/rota';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-rota-Cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rota-cadastro.component.html',
  styleUrl: './rota-cadastro.component.css'
})
export class RotaCadastroComponent {
  rota: Rota = { origem: '', destino: '', valor: 0 };

  constructor(private rotaService: RotaService, private router: Router) {}

  onSubmit() {
    this.rotaService.createRota(this.rota).subscribe(
      () => {
        alert('Rota criada com sucesso!');
        this.router.navigate(['/rotas']);
      },
      (error) => console.error('Erro ao criar rota:', error)
    );
  }
}