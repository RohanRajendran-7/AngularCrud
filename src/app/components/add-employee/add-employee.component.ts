import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  componentName = "addEmployee"
  employee?:Employee[]
  employeeName?:string;
  employeeAge?:string;
  employeeSalary?:string;
    constructor(public employeeservice: EmployeeService) {}
  
    ngOnInit(){
      // this.employeeservice.getEmployeeList().subscribe(data =>{
      //   this.employee = data.map(e=>{
      //     return{
      //       id: e.payload.doc.id,
      //       name: e.payload.doc.data().employeeName,
      //       age: e.payload.doc.data()['employeeAge']
      //     }
      //   })
      
      this.employeeservice.getEmployeeList().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe(data => {
        this.employee = data;
      });
    }
  
    
    deleteEmployee(item:Employee){
      this.employeeservice.deleteEmployee(item.id!)
          .then(() => {
            alert('The Employee was Deleted successfully!');
          })
          .catch(err => console.log(err));
    }
    cancelEdit(){
  
    }
    editRecord(item:Employee){
      item.isedit = true;
      item.editName = item.Name;
      item.editAge = item.Age
      item.editSalary = item.Salary
    }
    editEmployee(item:Employee){
      let data ={
        Name: item.editName,
        Age: item.editAge,
        Salary: item.editSalary
      };
      console.log(data)
      this.employeeservice.updateEmployee(item.id!,data)
      .then(()=>alert('updated Successfully'))
      .catch(err=>console.log(err))
  }
  createRecord(){
    let Record :{[key:string]: string} = {};
    Record['Name'] = this.employeeName!
    Record['Age'] = this.employeeAge!
    Record['Salary'] = this.employeeSalary!
    console.log(Record)
    this.employeeservice.createEmployee(Record).then(res =>{
      this.employeeName = ""
      this.employeeAge = undefined
      this.employeeSalary = undefined
      console.log(res)
    })
  }
  }
  