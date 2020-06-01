import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RestService } from 'src/app/services/rest.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-all-admin',
  templateUrl: './all-admin.component.html',
  styleUrls: ['./all-admin.component.css']
})
export class AllAdminComponent implements OnInit {

  allAdmins: any
  isInProgress: boolean;
  constructor(private modalService: NzModalService, private displayError: NzNotificationService, private api: RestService) { }

  ngOnInit() {
    this.getAllAdmin();
  }

  getAllAdmin() {
    this.api.getAllAdmins().subscribe((res: any) => {
      this.allAdmins = res
    }, (err: any) => {
      this.displayError.create(
        'error', 'Error', err.error.message,
        { nzDuration: 6500 }
      );
    })
  }

  deleteAdmin(id) {
    this.isInProgress = true;
    this.api.deleteAdmin(id).subscribe((res: any) => {
      this.isInProgress = false; // a flag for progressing
      this.getAllAdmin(); // refresh all employees
      this.displayError.create(
        'success', 'Success', res.message,
        { nzDuration: 6500 }
      );
    }),
      (err: any) => {
        this.isInProgress = false; // progressing flag
        this.displayError.create(
          'error', 'Error', err.error.message,
          { nzDuration: 6500 }
        );
      }
  }

  showConfirm(value): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this Admin?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOkLoading: this.isInProgress,
      nzOnOk: () => this.deleteAdmin(value),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

}