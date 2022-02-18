import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css']
})
export class CategoryListingComponent implements OnInit {

  department: any;
  productList: Product[]
  MAX = Number.MAX_VALUE
  min = 0;
  max = this.MAX;
  resultArray=[]
  constructor(private _httpClient:HttpClient, private _route:ActivatedRoute, private _cartService : CartService) { }

  ngOnInit(): void {
    this.department = this._route.snapshot.paramMap.get('department');

    this._httpClient.get<Product[]>('http://localhost:8080/products/products').subscribe(result => {
      this.productList = result;
      this.resultArray = result
      this.productList.sort(value => {return value.topSelling ? -1 : 1});
      console.log(this.productList);
    }, error => {
      console.log(error);
    })
  }

  priceRange(min, max){
    this.productList =[]
    this.resultArray;
    this.min = min;
    this.max = max;
    if(min === null || max === null){
      return this.productList;
    }
      for(const item of this.resultArray){
        if (item.price >= min && item.price <= max){
          this.productList.push(item);
        }
      }
    return this.productList
  }

  addToCart(product : Product){
    if(localStorage.getItem('isLoggedIn')=='true'){
      this._cartService.addToCart(product);
      console.log(product)
      alert('Product added!');
    }
    else{
      alert('please login')
    }
    
  }
}
