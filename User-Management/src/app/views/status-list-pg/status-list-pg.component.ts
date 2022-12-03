import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from 'src/app/models/status.model';
import { StatusHttpService } from 'src/app/services/http/status-http.service';
import { StatusFormModComponent } from './status-form-mod/status-form-mod.component';

@Component({
  selector: 'app-status-list-pg',
  templateUrl: './status-list-pg.component.html',
  styleUrls: ['./status-list-pg.component.css']
})
export class StatusListPgComponent implements OnInit {
  ELEMENT_DATA: Status[] = [];
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  filterName!: string;
  fullData!: Status[];

  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  dataSource: MatTableDataSource<Status> = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private statusService: StatusHttpService,
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
    this.statusService.getAll(this.currentPage + 1, this.pageSize)
      .subscribe((response) => {
        this.dataSource.data = response.body as Status[];
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = Number(response.headers.get("X-Total-Count"));
        });
        this.isLoading = false;
      })

    this.statusService.getAll()
      .subscribe((response) => {
        this.fullData = response.body as Status[];
      })
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.load();
  }

  openFormMod(id?: number) {
    const dialogRef = this.dialog.open(StatusFormModComponent, {
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
    this.statusService.delete(id)
      .subscribe((response) => {
        this.load();
      })
  }

  filter() {
    this.dataSource.data = this.fullData
      .filter(x => !this.filterName || (x.name.toLocaleLowerCase().includes(this.filterName.toLocaleLowerCase())))
  }
}
