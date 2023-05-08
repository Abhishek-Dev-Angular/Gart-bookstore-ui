import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
    selector: 'app-dialog',
    templateUrl: 'confirm-dialog.component.html',
  })
  export class ConfirmDialogComponent {
    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, private _router: Router) {}

    logout(){
        localStorage.clear();
        this._router.navigateByUrl('login');
    }
  }