import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  productList: MatTableDataSource<Producto> = new MatTableDataSource<Producto>();
  columnsHeader = ["date", "name", "price", "amount", "status", "opciones"];

  constructor(
    private productService: ProductoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.productListMethod();
  }

  productListMethod(): void {
    this.productService.getProducts().subscribe({
      next: (products) => this.productList.data = products, // Asignar directamente a data
      error: (err) => console.error('Error fetching products', err)
    });
  }

  editDialog(element: Producto): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productListMethod();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productListMethod();
      }
    });
  }

  openDeleteDialog(productId: string): void {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      data: { productId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Asegúrate de que productId sea un string antes de pasarlo a deleteProduct
        this.productService.deleteProduct(productId).subscribe(
          () => {
            this.productListMethod();
          },
          (error) => {
            console.error('Error deleting product', error);
            // Manejo de errores
          }
        );
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productList.filter = filterValue.trim().toLowerCase();
  }
}
