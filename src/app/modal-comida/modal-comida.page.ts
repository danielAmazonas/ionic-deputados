import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComidaService } from '../services/comida.service';

@Component({
  selector: 'app-modal-comida',
  templateUrl: './modal-comida.page.html',
  styleUrls: ['./modal-comida.page.scss'],
})
export class ModalComidaPage implements OnInit {
  @Input() id: number;
  public isEdit: boolean = false;

  public form: FormGroup;
  constructor(
    public modal: ModalController,
    public formBuilder: FormBuilder,
    public comidaService: ComidaService
  ) {
    this.form = formBuilder.group({
      nome: [''],
      tipo: [''],
      dataEntrega: [''],
      horaEntrega: [''],
      avaliacao: [''],
      isPimenta: [''],
    });
  }

  async ngOnInit() {
    if (this.id || this.id === 0) {
      this.isEdit = true;
      await this.editar(this.id);
    }
  }

  public fecharModal(): void {
    this.modal.dismiss();
  }

  public submitForm() {
    this.comidaService.salvarComida(this.form.value, this.id);
  }

  public async editar(id: number) {
    const comida = await this.comidaService.getComida(id);
    this.form.patchValue(comida);
  }
}
