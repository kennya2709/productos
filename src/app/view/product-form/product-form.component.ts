import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private fb: FormBuilder,
    private productService: ProductoService
  ) {
    this.productForm = this.fb.group({
      code: [data ? data.code : '', Validators.required], // Agregar el campo code
      name: [data ? data.name : '', Validators.required],
      price: [data ? data.price : '', Validators.required],
      amount: [data ? data.amount : '', Validators.required],
      status: [data ? data.status : '', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      if (this.data) {
        product._id = this.data.id; // Asignar el _id si estás editando un producto existente
        this.productService.editProduct(product).subscribe(result => {
          this.dialogRef.close(result); // Cerrar el diálogo con el resultado del servidor
        }, error => {
          console.error('Error al editar producto:', error);
          // Aquí puedes manejar el error de manera adecuada
        });
      } else {
        this.productService.addProduct(product).subscribe(result => {
          this.dialogRef.close(result); // Cerrar el diálogo con el resultado del servidor
        }, error => {
          console.error('Error al agregar producto:', error);
          // Aquí puedes manejar el error de manera adecuada
        });
      }
    }
  }
}
