import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ModalController } from '@ionic/angular';
import { ModalDeputadoPage } from '../modal-deputado/modal-deputado.page';

@Component({
  selector: 'app-membros',
  templateUrl: './membros.page.html',
  styleUrls: ['./membros.page.scss'],
})
export class MembrosPage implements OnInit {
  public membros: Array<any> = [];
  public id: number;
  public loading: boolean = false;

  constructor(
    public apiService: ApiService,
    public route: ActivatedRoute,
    public modal: ModalController
  ) {}

  ngOnInit() {
    this.loading = true;
    this.id = this.route.snapshot.params.id;
    this.buscarMembrosDoPartido();
  }

  buscarMembrosDoPartido() {
    this.apiService.getMembros(this.id).subscribe((res) => {
      this.membros = res.dados;
      this.loading = false;
    });
  }

  async abrirModal(id: number) {
    const modal = await this.modal.create({
      component: ModalDeputadoPage,
      componentProps: {
        id,
      },
    });
    return await modal.present();
  }
}
