import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category.model';
import { CategoryHttpService } from 'src/app/services/http/categories-http.service';
import { CategoryFormModComponent } from './category-form-mod/category-form-mod.component';

@Component({
  selector: 'app-category-list-pg',
  templateUrl: './category-list-pg.component.html',
  styleUrls: ['./category-list-pg.component.css']
})
export class CategoryListPgComponent implements OnInit {
  ELEMENT_DATA: Category[] = [];
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  fullData!: Category[];
  filterName!: string;

  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private categoryService: CategoryHttpService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.categoryService.getAll(this.currentPage + 1, this.pageSize)
      .subscribe((response) => {
        this.dataSource.data = response.body as Category[];
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = Number(response.headers.get("X-Total-Count"));
        });
        this.isLoading = false;
      })

    this.categoryService.getAll()
      .subscribe((response) => {
        this.fullData = response.body as Category[];
      })
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.load();
  }

  openFormMod(id?: number) {
    const dialogRef = this.dialog.open(CategoryFormModComponent, {
      data: {
        id
      },
    });
    dialogRef.afterClosed()
      .subscribe((response: boolean) => {
        this.load();
      })
  }

  delete(id: number) {
    this.categoryService.delete(id)
      .subscribe((response) => {
        this.load();
      })
  }

  filter() {
    this.dataSource.data = this.fullData
      .filter(x => !this.filterName || (x.name.toLocaleLowerCase().includes(this.filterName.toLocaleLowerCase())))
  }
}
