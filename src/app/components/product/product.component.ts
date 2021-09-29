import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http';
import { ProductResponseModel } from 'src/app/models/productResponseModel';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  apiUrl = "https://localhost:6826/api/products";
  // productResponseModel:ProductResponseModel={
  //   data : this.products,
  //   message:"",
  //   success:true
  // }

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    console.log("init is working")
    this.getProducts();
  }
  getProducts() {
    this.httpClient.get<ProductResponseModel>(this.apiUrl)
      .subscribe((response => {
        this.products = response.data
      }));
  }

}
