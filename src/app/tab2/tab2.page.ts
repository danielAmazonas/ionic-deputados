import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComidaPage } from '../modal-comida/modal-comida.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(public modal: ModalController) {}

  public async abrirModalCadastroComida(id: number) {
    const modal = await this.modal.create({
      component: ModalComidaPage,
      // componentProps: {
      //   id,
      // },
    });
    return await modal.present();
  }
}
