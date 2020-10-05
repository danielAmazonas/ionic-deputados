import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComidaPage } from '../modal-comida/modal-comida.page';
import { ComidaService } from '../services/comida.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public comidas: Array<any> = [];
  constructor(
    public modal: ModalController,
    public comidaService: ComidaService
  ) {}

  ngOnInit(): void {
    this.getComidas();
  }

  public async abrirModalCadastroComida(id: number) {
    const modal = await this.modal.create({
      component: ModalComidaPage,
      // componentProps: {
      //   id,
      // },
    });
    return await modal.present();
  }

  public async getComidas() {
    this.comidas = await this.comidaService.getAll();
  }

  public async remover(id: number) {
    await this.comidaService.remover(id);
    this.getComidas();
  }
}
