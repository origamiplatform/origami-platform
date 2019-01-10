import {
    FormBuilder,
    FormGroup,
    AbstractControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material';

export class Dialog {
    public formBuilder: FormBuilder;
    public dialogRef: MatDialogRef<any>;
    public formGroup: FormGroup;

    constructor(formBuilder, dialogRef) {
        this.formBuilder = formBuilder;
        this.dialogRef = dialogRef;
    }

    buildFormGroup(controlsConfig, controlsOption?) {
        this.formGroup = controlsOption
            ? this.formBuilder.group(controlsConfig, controlsOption)
            : this.formBuilder.group(controlsConfig);
    }
    getFormControl(target): AbstractControl {
        return this.formGroup.controls[target];
    }
    isValid(): boolean {
        return this.formGroup.valid;
    }
    closeDialog(data?): void {
        if (data) {
            this.dialogRef.close(data);
        } else {
            this.dialogRef.close();
        }
    }
}
