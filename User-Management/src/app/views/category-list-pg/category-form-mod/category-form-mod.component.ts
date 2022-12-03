import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';
import { CategoryHttpService } from 'src/app/services/http/categories-http.service';

@Component({
  selector: 'app-category-form-mod',
  templateUrl: './category-form-mod.component.html',
  styleUrls: ['./category-form-mod.component.css']
})
export class CategoryFormModComponent implements OnInit {
  category: Category = new Category();
  id!: number;

  constructor(
    private categoryService: CategoryHttpService,
    public dialogRef: MatDialogRef<CategoryFormModComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { id: number }
  ) { }

  ngOnInit(): void {
    this.getIdFromDialogData();
  }

  getIdFromDialogData() {
    this.id = this.dialogData.id;
    this.id && this.categoryService.getById(this.id)
      .subscribe((response) => {
        this.category = response;
      });
  }

  onSubmit() {
    this.id ?
      this.categoryService.update(this.id, this.category)
        .subscribe((response) => {
          if (response) {
            this.dialogRef.close(true);
          }
        }) :
      this.categoryService.create(this.category)
        .subscribe((response) => {
          if (response) {
            this.dialogRef.close(true);
          }
        });
  }
}
