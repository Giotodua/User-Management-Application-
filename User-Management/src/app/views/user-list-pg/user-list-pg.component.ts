import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Category } from 'src/app/models/category.model';
import { Status } from 'src/app/models/status.model';
import { UserFilter } from 'src/app/models/user-filter.model';
import { User } from 'src/app/models/user.model';
import { CategoryHttpService } from 'src/app/services/http/categories-http.service';
import { StatusHttpService } from 'src/app/services/http/status-http.service';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  selector: 'app-user-list-pg',
  templateUrl: './user-list-pg.component.html',
  styleUrls: ['./user-list-pg.component.css']
})
export class UserListPgComponent implements OnInit {
  ELEMENT_DATA: User[] = [];
  isLoading = false;
  fullData!: User[];
  displayedColumns: string[] = ['id', 'name', 'lastName', 'email', 'personalIdentificationNumber', 'date', 'category', 'status', 'edit', 'delete'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  dateRegex: RegExp = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  filterObj: UserFilter = new UserFilter;
  categories!: Category[];
  statuses!: Status[];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private userService: UserHttpService,
    private router: Router,
    private categoryService: CategoryHttpService,
    private statusService: StatusHttpService,
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadStatuses();
    this.loadCategories();
    this.load();
  }

  load() {
    this.isLoading = true;
    this.userService.getAll()
      .subscribe((response) => {
        this.dataSource.data = response;
        this.fullData = response;
        this.isLoading = false;
      })
  }

  loadStatuses() {
    this.statusService.getAll()
      .subscribe((response) => {
        this.statuses = response.body as Status[];
      })
  }

  loadCategories() {
    this.categoryService.getAll()
      .subscribe((response) => {
        this.categories = response.body as Category[];
      })
  }

  openFormPg(id?: number) {
    id ? this.router.navigate(['user-form'], { fragment: `${id}` }) : this.router.navigate(['user-form']);
  }

  delete(id: number) {
    this.userService.delete(id)
      .subscribe((response) => {
        this.load();
      })
  }

  filter() {
    this.dataSource.data = this.fullData
      .filter(x => !this.filterObj.name || (x.name.toLocaleLowerCase().includes(this.filterObj.name.toLocaleLowerCase())))
      .filter(x => !this.filterObj.lastName || (x.lastName.toLocaleLowerCase().includes(this.filterObj.lastName.toLocaleLowerCase())))
      .filter(x => !this.filterObj.email || (x.email.toLocaleLowerCase().includes(this.filterObj.email.toLocaleLowerCase())))
      .filter(x => !this.filterObj.personalIdentificationNumber || (x.personalIdentificationNumber === this.filterObj.personalIdentificationNumber))
      .filter(x => !(this.dateRegex.test(this.filterObj.startDate) && this.dateRegex.test(this.filterObj.endDate)) || ((moment(x.date, "DD/MM/YYYY").toDate() >= moment(this.filterObj.startDate, "DD/MM/YYYY").toDate()) && (moment(x.date, "DD/MM/YYYY").toDate() <= moment(this.filterObj.endDate, "DD/MM/YYYY").toDate())))
      .filter(x => !this.filterObj.statusName || (x.status.name === this.filterObj.statusName))
      .filter(x => !this.filterObj.categoryName || (x.category.name === this.filterObj.categoryName))
  }
}
