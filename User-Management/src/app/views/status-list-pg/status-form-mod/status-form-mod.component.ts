import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status } from 'src/app/models/status.model';
import { StatusHttpService } from 'src/app/services/http/status-http.service';

@Component({
  selector: 'app-status-form-mod',
  templateUrl: './status-form-mod.component.html',
  styleUrls: ['./status-form-mod.component.css']
})
export class StatusFormModComponent implements OnInit {
  status: Status = new Status();
  id!: number;

  constructor(
    private statusService: StatusHttpService,
    public dialogRef: MatDialogRef<StatusFormModComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { id: number }
  ) { }

  ngOnInit(): void {
    this.getIdFromDialogData();
  }

  getIdFromDialogData() {
    this.id = this.dialogData.id;
    this.id && this.statusService.getById(this.id)
      .subscribe((response) => {
        this.status = response;
      });
  }

  onSubmit() {
    this.id ?
      this.statusService.update(this.id, this.status)
        .subscribe((response) => {
          if (response) {
            this.dialogRef.close(true);
          }
        }) :
      this.statusService.create(this.status)
        .subscribe((response) => {
          if (response) {
            this.dialogRef.close(true);
          }
        });
  }
}
