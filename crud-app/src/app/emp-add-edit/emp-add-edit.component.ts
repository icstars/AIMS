import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToolsService } from '../services/tools.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss',
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  quality: string[] = ['sharp', 'dull', 'scrap'];
  sizes: number[] = [28, 32, 36, 42];
  location: string[] = ['Columbus', 'Kansas City', 'Keokuk', 'Winnepeg'];

  //colormapping

  constructor(
    private _fb: FormBuilder,
    private _empService: ToolsService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      id: '',
      graphiteblock_id: '',
      tool_quality: '',
      tool_size: '',
      location: '',
      last_sharpened: '',
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  //delete tool

  //update tool
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.updateTool(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Tool Detail Updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._empService.addTool(this.empForm.value).subscribe({
          next: (val: any) => {
            //alert('');
            this._coreService.openSnackBar('Tool Added Successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
