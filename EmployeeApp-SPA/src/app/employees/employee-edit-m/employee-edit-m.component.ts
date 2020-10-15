import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/_services/employee.service';
import { DesignationService } from 'src/app/_services/designation.service';
import { observable, Observable } from 'rxjs';
import { Designation } from 'src/app/_models/designation';
import { Salary } from 'src/app/_models/salary';
import { SalaryService } from 'src/app/_services/salary.service';
import { filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-employee-edit-m',
  templateUrl: './employee-edit-m.component.html',
  styleUrls: ['./employee-edit-m.component.css']
})
export class EmployeeEditMComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  employee: Employee;
  designations: Observable<Designation[]>;
  salary: Salary[];
  totalSalary: string;
  salaries: Observable<Salary[]>;
  selectedDesignation: string;
  baseUrl = environment.apiUrl;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute,
              private alertify: AlertifyService,
              private router: Router,
              private employeeService: EmployeeService,
              private designationService: DesignationService,
              private salaryService: SalaryService,
              private http: HttpClient
    ) { }

    ngOnInit(): void {
      const employeeID = this.route.snapshot.paramMap.get('id');
      if (employeeID == null)
      {
        this.resetEmployee();
      }
      else
      {
        this.route.data.subscribe(data => {
          this.employee = data.employee;
        });
      }
      this.fillDesignations();
      this.fillSalaries();
    }

    public onDesignationChange(designation): void {
      console.log('Designation changed...');
      this.selectedDesignation = designation.value;
      console.log(this.selectedDesignation);
      this.fillSalaries();
    }

    fillDesignations(): void{
      this.designations = this.designationService.getDesignations();
    }

    fillSalaries(): void
    {
      this.salaries = this.salaryService.getSalaries().pipe
      (
        map(salaries => {
          this.salary = salaries.filter(s => s.designationId.toString() === this.employee.designationId.toString());
          this.totalSalary = this.salary[0].totalSalary.toString();
          console.log(this.salary[0].totalSalary);
          return salaries;
        })
      );
    }

    resetEmployee(): void{
      this.employee = {
        id: null,
        firstName: '',
        lastName: '',
        emailId: '',
        age: null,
        dateOfBirth: null,
        gender: 'Male',
        designationId: null,
        designationName: '',
        isActive: null,
        created: new Date(),
        lastActive: new Date()
      };
    }

    cancel(): void{
      this.router.navigate(['/employees']);
    }

    save(): void{
      if (this.employee.id == null)
      {
        this.addEmployee();
      }
      else
      {
        this.updateEmployee();
      }
    }

    updateEmployee(): void {
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(next => {
        this.alertify.success('Employee updated successfully');
        this.editForm.reset(this.employee);
        this.router.navigate(['/employees']);
      }, error => {
        console.log(error);
        this.alertify.error(error);

      });
    }

    addEmployee(): void {
      this.employeeService.addEmployee(this.employee).subscribe(next => {
        this.alertify.success('Employee added successfully');
        this.editForm.reset(this.employee);
        this.router.navigate(['/employees']);
      }, error => {
        console.log(error);
        this.alertify.error(error);
      });
    }

    deleteEmployee(): void {
      if (!confirm('Are you sure you want to delete?')) {
        return;
      }

      this.employeeService.deleteEmployee(this.employee.id).subscribe(next => {
        this.alertify.success('Employee deleted successfully');
        this.editForm.reset(this.employee);
        this.router.navigate(['/employees']);
      }, error => {
        console.log(error);
        this.alertify.error(error);

      });
    }

}
