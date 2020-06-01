import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd';
import { RestService } from 'src/app/services/rest.service';


@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit {
  confirmModal?: NzModalRef; // For testing by now
  isInProgress: boolean = false;
  allEmployees: any;
  isVisible: boolean = false;
  constructor(private modalService: NzModalService, private displayError: NzNotificationService, private api: RestService) { }

  ngOnInit() {
    this.get_Employees();
  }

  get_Employees() {
    this.api.getAllEmployees().subscribe((res: any) => {
      this.allEmployees = res;
    }, (err: any) => {
      this.displayError.create(
        'error', 'Error', err.error.message,
        { nzDuration: 6500 }
      );
    })
  }

  deleteEmployee(id) {
    this.isInProgress = true;
    this.api.deleteEmployee(id).subscribe((res: any) => {
      this.isInProgress = false; // a flag for progressing
      this.get_Employees(); // refresh all employees
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
      nzTitle: 'Are you sure delete this Employee?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOkLoading: this.isInProgress,
      nzOnOk: () => this.deleteEmployee(value),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}

