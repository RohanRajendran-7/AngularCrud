import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/compat/database'
import {list} from '@angular/fire/database'
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeRef: AngularFirestoreCollection<Employee>;
  // studentsRef?: AngularFireList<any>
  constructor(public fireservices:AngularFirestore, public db:AngularFireDatabase) {
    this.employeeRef = fireservices.collection('Employee')
   }

  getEmployee(id:string){
    return this.fireservices.collection('Employee').doc(id).valueChanges()
  }

  getEmployeeList():AngularFirestoreCollection<Employee>{
    return this.employeeRef;
  }

  createEmployee(Record:{[key:string]: string}){
    return this.fireservices.collection('Employee').add(Record)
  }
  deleteEmployee(id: string): Promise<void> {
    return this.fireservices.collection('Employee').doc(id).delete();
  }
  updateEmployee(id:string,data:any){
    return this.fireservices.collection("Employee").doc(id).update(data)
  }

}
