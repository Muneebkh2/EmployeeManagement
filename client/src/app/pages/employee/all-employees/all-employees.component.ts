import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService, NzCalendarMode } from 'ng-zorro-antd';
import { RestService } from 'src/app/services/rest.service';
import { async } from '@angular/core/testing';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
// import { MatCalendarCellCssClasses } from '@angular/material/datepicker/public-api';
// import { MatCalendarCellCssClasses } from '@angular/material/datepicker/calendar-body';
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
  dates: any[] = [];
  modal
  emp_status: any;
  selectedDate: any

  present_dates: any = [
    // { date: "2020-06-04", status: true },
    // { date: "2020-06-05", status: true },
    // { date: "2020-06-08", status: true },
  ];
  date: any[];
  highlightDate: boolean;
  show: boolean = false
  attendance_Dates: any = [];
  startDate = new Date().toISOString();
  presentDateArray: any = [];
  absentDateArray: any = [];

  constructor(private modalService: NzModalService, private displayError: NzNotificationService, private api: RestService) { }

  ngOnInit() {
    this.get_Employees();
  }

  markStatus(event) {
    this.emp_status = event;
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  // get marked attendace
  markedAttendance(id) {
    this.api.getMarkedAttendance(id).subscribe((res: any) => {
      this.date = res
      console.log("res", res)
      this.date.forEach(el => {
        this.attendance_Dates.push({ 'date': this.formatDate(el.day), 'status': el.status })
      })
    }, (err: any) => {
      this.displayError.create(
        'error', 'Error', err.error.message,
        { nzDuration: 6500 }
      );
    })
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
    this.user_id = userId
    this.markedAttendance(this.user_id)
  }

  // mark attendance
  addAttendance() {
    // removing duplicate objects from array
    let result = this.attendance_Dates.reduce((unique, o) => {
      if (!unique.some(obj => obj.date === o.date && obj.status === o.status)) {
        unique.push(o);
      }
      return unique;
    }, []);

    let body = {
      user_id: this.user_id,
      dates_marked: result
    }
    this.api.markedEmpAttendance(body).subscribe(
      (res: any) => {
        this.displayError.create(
          'success', 'Success', res.message.message,
          { nzDuration: 4500 }
        );
        setTimeout(() => {
          location.reload()
        }, 60.00);
      },

      (err: any) => {
        this.displayError.create(
          'error', 'Error', err.error.email,
          { nzDuration: 6500 }
        );
      })
  }

  presentClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      this.attendance_Dates.forEach(el => {
        if (el.status === true) {
          this.presentDateArray.push(el)
        }
      })
      const highlightDate = this.presentDateArray
        .map(strDate => new Date(strDate.date))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());

      return highlightDate ? 'present-date' : '';
    };
  }
  absentClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      this.attendance_Dates.forEach(el => {
        if (el.status === false) {
          this.absentDateArray.push(el)
        }
      })
      const highlightDate = this.absentDateArray
        .map(strDate => new Date(strDate.date))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());

      return highlightDate ? 'absent-date' : '';
    };
  }

  isSelected = (event: any, current: Date) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);

    return this.daysSelected.find(x => x == date) ? "selected" : null;
  };

  select(event: any, calendar: any) {
    if (this.emp_status == undefined) {
      this.displayError.create(
        'error', 'Error', 'Please select the status!',
        { nzDuration: 6500 }
      );
    }
    else {
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
        this.present_dates.push({ 'date': el, 'status': Number(this.emp_status) })
      })
      this.attendance_Dates.push(...this.present_dates)
      this.displayError.create(
        'success', 'Success', 'Date is marked! Please click on given Button below',
        { nzDuration: 6500 }
      );
    }
  }

}

