import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SmartCustomDialogComponent } from '../components/smart-custom-dialog/smart-custom-dialog.component';
import { SmartDialogConfig } from '../SmartInterfaces/SmartDialogInterface';

@Injectable({
  providedIn: 'root'
})
export class SmartDialogService {

  constructor(private dialog: MatDialog) {}

  openDialog(data_in:SmartDialogConfig) {
    const dialogRef = this.dialog.open(SmartCustomDialogComponent, {
      data: data_in
    });
    return dialogRef.componentInstance;
  }

  closeDialog(){
     this.dialog.closeAll();
  }


}
