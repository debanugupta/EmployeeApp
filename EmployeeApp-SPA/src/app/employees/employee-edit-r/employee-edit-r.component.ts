import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Employee } from 'src/app/_models/employee';
import { Observable } from 'rxjs';
import { Designation } from 'src/app/_models/designation';
import { EmployeeService } from 'src/app/_services/employee.service';
import { DesignationService } from 'src/app/_services/designation.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-employee-edit-r',
  templateUrl: './employee-edit-r.component.html',
  styleUrls: ['./employee-edit-r.component.css']
})
export class EmployeeEditRComponent implements OnInit {
  editForm: FormGroup;
  employee: Employee;
  designations: Observable<Designation[]>;
  employeeId: string;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private designationService: DesignationService,
              private alertify: AlertifyService
    ) { }

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId == null)
      {
        this.resetEmployee();
      }
      else
      {
        this.route.data.subscribe(data => {
          this.employee = data['employee'];
          this.initForm();
        });
      }
    this.fillDesignations();
  }

  fillDesignations(){
    this.designations = this.designationService.getDesignations();
  }

  resetEmployee(){
    this.editForm = new FormGroup({
      firstName : new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
      gender: new FormControl('Male', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      isActive: new FormControl(false, Validators.required),
      designationId: new FormControl('', Validators.required),
      created: new FormControl(new Date()),
      lastActive: new FormControl(new Date()),
    });
  }
  cancel() {
    this.router.navigate(['/employees']);  
  }

  save(){
    // let employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId == null)
    {
      this.addEmployee();
    }
    else
    {
      this.updateEmployee();
    }
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.employee.id, this.editForm.value).subscribe(next => {
      this.alertify.success('Employee updated successfully');
      this.editForm.reset(this.employee);
      this.router.navigate(['/employees']);
    }, error => {
      console.log(error);
      this.alertify.error(error);
    });
  }

  addEmployee() {
    this.employeeService.addEmployee(this.editForm.value).subscribe(next => {
      this.alertify.success('Employee added successfully');
      this.editForm.reset(this.employee);
      this.router.navigate(['/employees']);
    }, error => {
      console.log(error);
      this.alertify.error(error);
    });
  }

  deleteEmployee() {
    if (!confirm('Are you sure you want to delete?'))
      return;
      
    this.employeeService.deleteEmployee(this.employee.id).subscribe(next => {
      this.alertify.success('Employee deleted successfully');
      this.editForm.reset(this.employee);
      this.router.navigate(['/employees']);
    }, error => {
      console.log(error);
      this.alertify.error(error);

    });
  }

    private initForm() {
      this.editForm = new FormGroup({
        firstName : new FormControl(this.employee.firstName, Validators.required),
        lastName: new FormControl(this.employee.lastName, Validators.required),
        emailId: new FormControl(this.employee.emailId, Validators.required),
        gender: new FormControl(this.employee.gender, Validators.required),
        dateOfBirth: new FormControl(this.employee.dateOfBirth, Validators.required),
        isActive: new FormControl(this.employee.isActive, Validators.required),
        designationId: new FormControl(this.employee.designationId, Validators.required)
      });
    }
  }

