import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Deputado } from '../models/deputado';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-modal-deputado',
  templateUrl: './modal-deputado.page.html',
  styleUrls: ['./modal-deputado.page.scss'],
})
export class ModalDeputadoPage implements OnInit {
  @Input() id: number;
  public deputado: Deputado;
  public carregando: any;
  public carregamentoFinalizado: boolean = false;
  public finish: boolean = false;

  constructor(
    public apiService: ApiService,
    public modal: ModalController,
    public loading: LoadingController
  ) {}

  public buscarDeputado(id: number) {
    this.showCarregando();
    this.apiService.getDeputado(id).subscribe((res) => {
      this.deputado = res.dados;
      this.fecharCarregando();
      this.carregamentoFinalizado = true;
      this.finish = true;
    });
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

  ngOnInit() {
    this.buscarDeputado(this.id);
  }

  public fecharModal(): void {
    this.modal.dismiss();
  }
}
