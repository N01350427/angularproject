import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { AuthGuard } from '../services/auth-guard.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  id: any;
  product: Product = new Product();

  productList: Product[]

  constructor(private _httpClient: HttpClient, private _cartService: CartService, private authguard: AuthGuard) { }

  ngOnInit(): void {

    this._httpClient.get<Product[]>('http://localhost:8080/products/products').subscribe(result => {
      this.productList = result;
      console.log(this.productList);

    }, error => {
      console.log(error);
    })
  }

  addToCart(product: Product) {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this._cartService.addToCart(product);
      console.log(product)
      alert('Product added!');
    }
    else {
      alert('please login for adding to cart')
    }

  }

}
