import {Injectable} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EmployeeEditRComponent } from '../employees/employee-edit-r/employee-edit-r.component';
import { EmployeeEditComponent } from '../employees/employee-edit/employee-edit.component';
import { EmployeeEditMComponent } from '../employees/employee-edit-m/employee-edit-m.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<EmployeeEditComponent> {
    canDeactivate(component: EmployeeEditComponent ) {
         if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue?  Any unsaved changes will be lost');
         }

         return true;
     }
}