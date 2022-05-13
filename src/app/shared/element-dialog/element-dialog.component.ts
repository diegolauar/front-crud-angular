import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CostumerElement } from 'src/app/models/CostumerElement';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {
  element!: CostumerElement;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: CostumerElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}

  ngOnInit(): void {
    if (this.data.cpf != null) {
      this.isChange = true;
      this.data.update = true;
    } else {
      this.isChange = false;
      this.data.update = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
