import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Employee } from './models/employee.model';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task';

  constructor(public employeeservice: EmployeeService) {}

  ngOnInit(){ }

  }
