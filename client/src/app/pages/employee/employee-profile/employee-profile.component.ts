import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  isVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  choosePicture(){
    this.isVisible = true;
  }
  
  handleCancel(){
    this.isVisible = false;
  }

}
