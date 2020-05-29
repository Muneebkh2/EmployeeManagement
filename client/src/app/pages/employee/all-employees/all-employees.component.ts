import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit {
  confirmModal?: NzModalRef; // For testing by now
  isInProgress: boolean = false;
  allEmployees: any;

  constructor(private modalService: NzModalService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    // this.getAllEmployees()
  }

  // getAllEmployees() {
  //   this.api.getAdmin().subscribe((res: any) => {
  //     this.allEmployees = res
  //     console.log(this.allEmployees)
  //   }, (err: any) => {
  //     this.modalService.create(
  //       'error', 'Error', err.error.message,
  //       { nzDuration: 6500 }
  //     );
  //   })
  // }

  // deleteEmployee(id) {
  //   this.isInProgress = true;
  //   this.api.deleteAdmin(id).subscribe((res: any) => {
  //     this.isInProgress = false; // a flag for progressing
  //     this.getAllEmployees(); // refresh all employees
  //     this.modalService.create(
  //       'success', 'Success', res.message,
  //       { nzDuration: 6500 }
  //     );
  //   }),
  //     (err: any) => {
  //       this.isInProgress = false; // progressing flag
  //       this.modalService.create(
  //         'error', 'Error', err.error.message,
  //         { nzDuration: 6500 }
  //       );
  //     }
  // }


  showConfirm(value): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this Employee?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOkLoading: this.isInProgress,
      // nzOnOk: () => this.deleteEmployee(value),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }


  displayedColumns: string[] = ['name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

}

export interface PeriodicElement {
  name: string;
  weight: number;
  symbol: string;
  action: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', weight: 1.0079, symbol: 'H', action: '' },
  { name: 'Helium', weight: 4.0026, symbol: 'He', action: '' },
  { name: 'Lithium', weight: 6.941, symbol: 'Li', action: '' },
  { name: 'Beryllium', weight: 9.0122, symbol: 'Be', action: '' },
  { name: 'Boron', weight: 10.811, symbol: 'B', action: '' },
  { name: 'Carbon', weight: 12.0107, symbol: 'C', action: '' },
  { name: 'Nitrogen', weight: 14.0067, symbol: 'N', action: '' },
  { name: 'Oxygen', weight: 15.9994, symbol: 'O', action: '' },
  { name: 'Fluorine', weight: 18.9984, symbol: 'F', action: '' },
  { name: 'Neon', weight: 20.1797, symbol: 'Ne', action: '' },
  { name: 'Sodium', weight: 22.9897, symbol: 'Na', action: '' },
  { name: 'Magnesium', weight: 24.305, symbol: 'Mg', action: '' },
  { name: 'Aluminum', weight: 26.9815, symbol: 'Al', action: '' },
  { name: 'Silicon', weight: 28.0855, symbol: 'Si', action: '' },
  { name: 'Phosphorus', weight: 30.9738, symbol: 'P', action: '' },
  { name: 'Sulfur', weight: 32.065, symbol: 'S', action: '' },
  { name: 'Chlorine', weight: 35.453, symbol: 'Cl', action: '' },
  { name: 'Argon', weight: 39.948, symbol: 'Ar', action: '' },
  { name: 'Potassium', weight: 39.0983, symbol: 'K', action: '' },
  { name: 'Calcium', weight: 40.078, symbol: 'Ca', action: '' },
];
