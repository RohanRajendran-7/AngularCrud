import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  componentName = "Employee"
  employee?:Employee[]
  employeeName?:string;
  employeeAge?:string;
  employeeSalary?:string;
  constructor(public employeeservice: EmployeeService) {}

  ngOnInit(): void {
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
}