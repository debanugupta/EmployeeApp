import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/_services/employee.service';
import { DesignationService } from 'src/app/_services/designation.service';
import { Observable } from 'rxjs';
import { Designation } from 'src/app/_models/designation';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

// import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  employee: Employee;
  designations: Observable<Designation[]>;
  bsConfig: Partial<BsDatepickerConfig>;
  
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute,
    private alertify: AlertifyService,
    private router: Router,
    private employeeService: EmployeeService,
    private designationService: DesignationService
    // , private authService: AuthService
    ) { }

    ngOnInit() {
      let employeeID = this.route.snapshot.paramMap.get('id');
      if (employeeID == null)
      {
        this.resetEmployee();
      }
      else
      {
        this.route.data.subscribe(data => {
          this.employee = data['employee'];
        });
      }
      this.bsConfig = {
        dateInputFormat: 'YYYY-MM-DD',
        containerClass: 'theme-red'
      },
      this.fillDesignations();
      // this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    }

    fillDesignations(){
      // this.designationService.getDesignations()
      // .subscribe(res => this.designationList = res as []);
      this.designations = this.designationService.getDesignations();
      
    }

    resetEmployee(){
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

    cancel(){
      this.router.navigate(['/employees']);
    }

    save(){
      if (this.employee.id == null)
      {
        this.addEmployee();
      }
      else
      {
        this.updateEmployee();
      }
    }
  
    updateEmployee() {
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(next => {
        this.alertify.success('Employee updated successfully');
        this.editForm.reset(this.employee);
        this.router.navigate(['/employees']);
      }, error => {
        console.log(error);
        this.alertify.error(error);

      });
    }

    addEmployee() {
      this.employeeService.addEmployee(this.employee).subscribe(next => {
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

}
