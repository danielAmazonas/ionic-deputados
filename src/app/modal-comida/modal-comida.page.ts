import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
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
  public carregando: any = null;

  public form: FormGroup;
  constructor(
    public modal: ModalController,
    public formBuilder: FormBuilder,
    public comidaService: ComidaService,
    public loading: LoadingController
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

  public async submitForm() {
    await this.showCarregando();
    await this.comidaService.salvarComida(this.form.value, this.id);
    await this.fecharCarregando();
  }

  public async editar(id: number) {
    const comida = await this.comidaService.getComida(id);
    this.form.patchValue(comida);
  }

  async showCarregando() {
    this.carregando = await this.loading.create({
      message: 'Aguarde...',
    });
    await this.carregando.present();
  }

  async fecharCarregando() {
    await this.carregando.dismiss();
  }
}
