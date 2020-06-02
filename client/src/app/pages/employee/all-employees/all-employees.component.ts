import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService, NzCalendarMode } from 'ng-zorro-antd';
import { RestService } from 'src/app/services/rest.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AllEmployeesComponent implements OnInit {
  confirmModal?: NzModalRef; // For testing by now
  isInProgress: boolean = false;
  allEmployees: any;
  isVisible: boolean = false;
  user_id: any;
  daysSelected: any[] = [];
  event: any;
  marked_dates: any[] = [];
  present_dates: any = [];

  constructor(private modalService: NzModalService, private displayError: NzNotificationService, private api: RestService) { }

  ngOnInit() {
    this.get_Employees();
  }

  get_Employees() {
    this.api.getAllEmployees().subscribe((res: any) => {
      this.allEmployees = res;
      console.log(this.allEmployees)
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

  showModal(userId) {
    this.isVisible = true;
    this.user_id = userId
  }

  addAttendance() {
    let body = {
      user_id: this.user_id,
      dates_marked: this.marked_dates
    }

    this.api.markedAttendance(body).subscribe((res: any) => {
      this.isInProgress = false; // a flag for progressing
      this.displayError.create(
        'success', 'Success', res.message,
        { nzDuration: 6500 }
      );
    }),
      (err: any) => {
        this.displayError.create(
          'error', 'Error', err.error.message,
          { nzDuration: 6500 }
        );
      }
    this.isVisible = false;
  }

  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelected.find(x => x == date) ? "selected" : null;
  };

  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);

    calendar.updateTodaysDate();

    for (let i = 0; i < this.daysSelected.length; i++) {
      if (this.marked_dates.indexOf(this.daysSelected[i]) === -1) {
        this.marked_dates.push(this.daysSelected[i]);
      }
    }
    this.present_dates = []
    this.marked_dates.forEach(el => {
      // this.present_dates = null
      this.present_dates.push({ 'date': el, 'status': 1 })
    })

    // this.present_dates.filter((date, i) => {
    //   if (date == this.marked_dates[i].date)
    //     this.present_dates.push(date)
    // })
    // console.log(this.marked_dates)

    console.log(this.present_dates)

  }

}

