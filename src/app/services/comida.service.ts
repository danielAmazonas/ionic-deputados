import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class ComidaService {
  constructor(public storage: Storage) {
    // this.removeAll();
  }

  public async getAll() {
    let comidas = await this.storage.get('comidas');
    comidas = JSON.parse(comidas);
    return comidas;
  }

  public async salvarComida(comida) {
    let comidas = await this.getAll();
    if (!comidas) {
      comidas = [];
    }
    comidas.push(comida);
    this.storage.set('comidas', JSON.stringify(comidas));
  }

  public async removeAll() {
    await this.storage.remove('comidas');
  }

  public async remover(id: number) {
    let comidas = await this.getAll();
    comidas.splice(id, 1);
    await this.storage.set('comidas', JSON.stringify(comidas));
  }
}
