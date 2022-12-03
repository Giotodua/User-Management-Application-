import { Component, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Status } from 'src/app/models/status.model';
import { User } from 'src/app/models/user.model';
import { CategoryHttpService } from 'src/app/services/http/categories-http.service';
import { StatusHttpService } from 'src/app/services/http/status-http.service';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  selector: 'app-user-form-pg',
  templateUrl: './user-form-pg.component.html',
  styleUrls: ['./user-form-pg.component.css']
})
export class UserFormPgComponent implements OnInit {
  user: User = new User();
  id!: number;
  categories!: Category[];
  statuses!: Status[];

  constructor(
    private userService: UserHttpService,
    private statusService: StatusHttpService,
    private categoryService: CategoryHttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getIdFromDialogData();
    this.loadCategories();
    this.loadStatuses();
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

  getIdFromDialogData() {
    this.route.fragment.subscribe((response) => {
      this.id = Number(response);
      this.id && this.userService.getById(this.id)
        .subscribe((response) => {
          this.user = response;
        });
    })
  }

  onSubmit() {
    this.id ?
      this.userService.update(1, this.user)
        .subscribe((response) => {
          if (response) {
            this.router.navigate(['user-list']);
          }
        }) :
      this.userService.create(this.user)
        .subscribe((response) => {
          if (response) {
            this.router.navigate(['user-list']);
          }
        });
  }
}
