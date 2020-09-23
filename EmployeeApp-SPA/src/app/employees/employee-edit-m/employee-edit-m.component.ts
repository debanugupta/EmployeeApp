import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/_services/employee.service';
import { DesignationService } from 'src/app/_services/designation.service';
import { Observable } from 'rxjs';
import { Designation } from 'src/app/_models/designation';


@Component({
  selector: 'app-employee-edit-m',
  templateUrl: './employee-edit-m.component.html',
  styleUrls: ['./employee-edit-m.component.css']
})
export class EmployeeEditMComponent implements OnInit {

  @ViewChild('editForm', {static: true}) editForm: NgForm;
  employee: Employee;
  designations: Observable<Designation[]>;
  
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
      this.route.data.subscribe(data => {
        this.employee = data['employee'];
      });


      this.fillDesignations();
      // this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    }

    fillDesignations(){
      this.designations = this.designationService.getDesignations(); 
    }

    cancel(){
      this.router.navigate(['/employees']);
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

}
