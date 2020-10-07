import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalComidaPage } from '../modal-comida/modal-comida.page';
import { ComidaService } from '../services/comida.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public comidas: Array<any> = [];
  public carregando: any = null;
  constructor(
    public modal: ModalController,
    public comidaService: ComidaService,
    public loading: LoadingController
  ) {}

  ngOnInit(): void {
    this.getComidas();
  }

  public async abrirModalCadastroComida(id: number) {
    await this.showCarregando();
    const modal = await this.modal.create({
      component: ModalComidaPage,
      // componentProps: {
      //   id,
      // },
    });
    await this.fecharCarregando();
    return await modal.present();
  }

  public async getComidas() {
    await this.showCarregando();
    this.comidas = await this.comidaService.getAll();
    await this.fecharCarregando();
  }

  public async remover(id: number) {
    await this.comidaService.remover(id);
    this.getComidas();
  }

  public async editar(id: number) {
    await this.showCarregando();
    const modal = await this.modal.create({
      component: ModalComidaPage,
      componentProps: {
        id,
      },
    });
    await this.fecharCarregando();
    return await modal.present();
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
