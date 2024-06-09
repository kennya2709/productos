import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/model/producto';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  formGroup!: FormGroup;
  isEditMode: boolean = false; // Agrega la propiedad isEditMode y establece su valor inicial en false

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data) {
      this.isEditMode = true; // Si hay datos, establece isEditMode en true
    }
  }

  initForm(): void {
    if (!this.data) {
      this.formGroup = this.formBuilder.group({
        name: ["", Validators.required],
        code: ["", Validators.required],
        category: ["", Validators.required],
        description: ["", Validators.required],
        price: ["", Validators.required],
        amount: ["", Validators.required]
      });
    } else {
      this.formGroup = this.formBuilder.group({
        name: [this.data.name || "", Validators.required],
        code: [this.data.code || "", Validators.required],
        category: [this.data.category || "", Validators.required],
        description: [this.data.description || "", Validators.required],
        price: [this.data.price || "", Validators.required],
        amount: [this.data.amount || "", Validators.required]
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
