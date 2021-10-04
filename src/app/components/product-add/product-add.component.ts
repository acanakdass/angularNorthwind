import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService) { }

  productAddForm: FormGroup;
  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ["", Validators.minLength(1)],
      unitPrice: ["", Validators.required],
      unitsInStock: ["", Validators.required],
      categoryId: ["", Validators.required],
    })
  }

  add() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value);
      this.productService.add(productModel).subscribe(res => {
        if (res.success) {
          this.toastrService.success(res.message)
        } else {
          this.toastrService.error(res.message);
        }
      }, resError => {
        console.log(resError);
        if (resError.error.length > 0) {
          console.log(resError.error.Errors)
          const errors = resError.error.Errors
          for (let i = 0; i < errors.length; i++) {
            this.toastrService.error(errors[i].ErrorMessage, "Doğrulama Hatası");
          }

        }
      })
    } else {
      this.toastrService.error("Form bilgileri eksik ya da geçersiz")
    }
  }
}
