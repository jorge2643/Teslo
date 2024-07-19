import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {

  constructor (
    private readonly productsService: ProductsService
  ){}

  async runSeed(){
    await this.insertSeed();
    return 'Seed Ejecutado'
  }

  private async insertSeed(){
    await this.productsService.deleteAllProduct();

    const seedProducts = initialData.products;

    const insertPromises = []; 

    seedProducts.forEach( product => {
      insertPromises.push( this.productsService.create( product ) )
    });

    await Promise.all( insertPromises )

    return true
  }

}
