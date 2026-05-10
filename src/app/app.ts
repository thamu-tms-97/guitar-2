import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { ProductsService } from './services/products';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(
    private productsService: ProductsService,
    private logger: NGXLogger,
  ) {}

  ngOnInit() {
    this.logger.info('App component initialized');
  }
}
