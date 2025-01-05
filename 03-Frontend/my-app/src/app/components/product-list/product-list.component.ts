import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CardItem } from '../../common/card-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];
  currentCategoryId: number = 1;
  thePageNumber: number =1;
  thePageSize: number = 10;
  theTotalElements: number = 0;
  searchMode: boolean = false;
  previousCategoryId: number = 1;
  constructor(private productService: ProductService,private cartService: CartService,
     private route: ActivatedRoute){}

  ngOnInit(): void{
    this.route.paramMap.subscribe(() =>{
      this.listProducts();
    })
   
    

  }
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else
    this.handleListProducts();
  }
  handleSearchProducts() {
    const key: string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(key).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts(){

    const hasId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      this.currentCategoryId = 1;
    }

    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }
    this.previousCategoryId =this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber-1,
      this.thePageSize, this.currentCategoryId).subscribe(
        data => {
          this.products = data._embedded.products;
          this.thePageNumber =data.page.number+1;
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements;
        }
      )


  }

  addToCart(theProduct: Product){

    const theCartItem = new CardItem(theProduct);
    this.cartService.addToCart(theCartItem);

    
    
    
  }
}