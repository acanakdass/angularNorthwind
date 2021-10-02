import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://localhost:6826/api/";
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<listResponseModel<Product>> {
    let newUrl = this.apiUrl + "products";
    return this.httpClient.get<listResponseModel<Product>>(newUrl);
  }

  getProductsByCategory(categoryId: number): Observable<listResponseModel<Product>> {
    let newUrl = this.apiUrl + "products/getByCategory/" + categoryId;
    return this.httpClient.get<listResponseModel<Product>>(newUrl);
  }

  add(product: Product): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "products", product);
  }
}
