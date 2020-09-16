import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/_services/employee.service';
// import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  employee: Employee;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private employeeService: EmployeeService
    // , private authService: AuthService
    ) { }

    ngOnInit() {
      this.route.data.subscribe(data => {
        this.employee = data['employee'];
      });
      // this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    }
  
    updateEmployee() {
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(next => {
        this.alertify.success('Employee updated successfully');
        this.editForm.reset(this.employee);
      }, error => {
        this.alertify.error(error);
      });
    }

}
