import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Employee } from 'src/app/_models/employee';
import { Observable } from 'rxjs';
import { Designation } from 'src/app/_models/designation';
import { EmployeeService } from 'src/app/_services/employee.service';
import { DesignationService } from 'src/app/_services/designation.service';

@Component({
  selector: 'app-employee-edit-r',
  templateUrl: './employee-edit-r.component.html',
  styleUrls: ['./employee-edit-r.component.css']
})
export class EmployeeEditRComponent implements OnInit {
  employeeForm: FormGroup;
  employee: Employee;
  designations: Observable<Designation[]>;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private designationService: DesignationService
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.employee = data['employee'];
    });
    this.fillDesignations();
    this.initForm();
  }

    private initForm() {
      this.employeeForm = new FormGroup({
        firstName : new FormControl(this.employee.firstName, Validators.required),
        lastName: new FormControl(this.employee.lastName, Validators.required),
        emailId: new FormControl(this.employee.emailId, Validators.required),
        gender: new FormControl(this.employee.gender, Validators.required),
        dateOfBirth: new FormControl(this.employee.dateOfBirth, Validators.required),
        isActive: new FormControl(this.employee.isActive, Validators.required),
        designationId: new FormControl(this.employee.designationId, Validators.required)
      });
    }

    fillDesignations(){
      this.designations = this.designationService.getDesignations();
      
    }

    onSubmit() {

      // if (this.editMode) {
      //   this.recipeService.updateRecipe(this.id, this.recipeForm.value)
      // } else {
      //   this.recipeService.addRecipe(this.recipeForm.value);
      // }
      // this.onCancel();
    }

    onCancel() {
      
    }
  }

