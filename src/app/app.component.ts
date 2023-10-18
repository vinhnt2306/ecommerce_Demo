import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  title = 'ecommerce';
  cartProducts: any[] = [];
  subTotal: number = 0;

  constructor(private productService : ProductService, private router: Router) {
    this.productService.cartAddedSubject.subscribe(res => {
      debugger;
      this.loadCart();
    })
  }

  redirectToSale(){
    this.router.navigateByUrl("/sale");
  }

  ngOnInit(): void {
      this.loadCart();
  }

  loadCart() {
    this.subTotal = 0
    this.productService.getCartItemsByCustId(1).subscribe((res: any) => {
    this.cartProducts = res.data;
    this.cartProducts.forEach(element => {
      this.subTotal = this.subTotal + element.productPrice;
    });
    debugger;
    })
  }

}
