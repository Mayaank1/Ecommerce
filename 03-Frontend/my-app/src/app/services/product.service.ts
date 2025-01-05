import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  
  private categoryUrl = 'http://localhost:8080/api/product-category'
  

  private baseUrl = 'http://localhost:8080/api/products'

  constructor(private httpClient:HttpClient) { }
  getProductList(theCategoryId: number): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl)
    .pipe(
      map(response => response._embedded.products)
    );
  }

  getProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl)
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetProductCategoriesResponse>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(key: string): Observable<Product[]> {
    const searchUrl1 = `${this.baseUrl}/search/findByNameContaining?name=${key}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl1)
    .pipe(
      map(response => response._embedded.products)
    );
    
  }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = this.baseUrl + '/' + theProductId;
    return this.httpClient.get<Product>(productUrl);
  }
  
}
    interface GetResponseProducts{
      _embedded :{
        products: Product[]
      },
      page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
      }
    }


    interface GetProductCategoriesResponse {
      _embedded: { productCategory: ProductCategory[]; };
    }

