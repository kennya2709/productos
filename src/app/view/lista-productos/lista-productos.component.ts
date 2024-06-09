import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  productList!: MatTableDataSource<Producto>;
  columnsHeader = ["date", "name", "price", "amount", "status", "opciones"];
  
  constructor(
    private productService: ProductoService,
    private dialog: MatDialog // Inyecta MatDialog en el constructor
  ) {}
  
  ngOnInit(): void {
    this.productListMethod();
  }
  
  productListMethod(): void {
    try {
      this.productService.getProducts()
        .subscribe(item => this.productList = new MatTableDataSource(item));
    } catch (error) {
      console.log(error);
    }
  }
  
  editDialog(element: Producto): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: element // Pasa el elemento al diálogo
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      if (result) {
        this.productListMethod();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: null // Pasa null al diálogo si no necesitas ningún dato inicial
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      if (result) {
        this.productListMethod();
      }
    });
  }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productList.filter = filterValue.trim().toLowerCase();
  }
}
