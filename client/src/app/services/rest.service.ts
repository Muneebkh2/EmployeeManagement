import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  localhost = 'http://localhost:3000/api/'

  constructor(private http: HttpClient) { }

  // *****************
  //  Admin CRUD -> Request Methods
  // *****************

  // getting all admins
  getAllAdmins() {
    return this.http.get(this.localhost + 'admin/all')
  }
  // create an admin
  createAdmin(body) {
    return this.http.post(this.localhost + 'admin/create', body)
  }
  // update admin by id
  updateAdmin(id, body) {
    return this.http.put(this.localhost + `admin/update/${id}`, body)
  }
  // delete admin by id
  deleteAdmin(id) {
    return this.http.delete(this.localhost + `admin/delete/${id}`)
  }

  // *****************
  //  Employee CRUD -> Request Methods
  // *****************

  // getting all employees
  getAllEmployees() {
    return this.http.get(this.localhost + 'employee/all')
  }

  // create an employee
  createEmployee(body) {
    return this.http.post(this.localhost + 'employee/create', body)
  }
  // update employee by id
  updateEmployee(id, body) {
    return this.http.put(this.localhost + `employee/update/${id}`, body)
  }

  // delete employee by id
  deleteEmployee(id) {
    return this.http.delete(this.localhost + `employee/delete/${id}`)
  }

  // *****************
  //  Employee CRUD -> Request Methods
  // *****************

  // marked attendance
  markedAttendance(body) {
    return this.http.post(this.localhost + 'employee/attendance/mark', body)
  }

}
