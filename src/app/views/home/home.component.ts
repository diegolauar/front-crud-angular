import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CostumerElement } from 'src/app/models/CostumerElement';
import { CostumerElementService } from 'src/app/services/costumerElement.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CostumerElementService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['name', 'email', 'cpf', 'actions'];
  dataSource!: CostumerElement[];

  constructor(
    public dialog: MatDialog,
    public CostumerElementService: CostumerElementService
  ) {
    this.CostumerElementService.getElements()
      .subscribe((data: CostumerElement[]) => {
        this.dataSource = data;
      });
  }

  ngOnInit(): void {
  }

  openDialog(element: CostumerElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        name: '',
        cpf: null,
        email: ''
      } : {
        name: element.name,
        cpf: element.cpf,
        email: element.email
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {     
        if (result.update) {
          result = {
            name: result.name,
            email: result.email,
            cpf: result.cpf
          }
          this.CostumerElementService.editElement(result)
            .subscribe((data: CostumerElement) => {
              const index = this.dataSource.findIndex(p => p.cpf === data.cpf);
              this.dataSource[index] = data;
              this.table.renderRows();
            });
        } else {
          result = {
            name: result.name,
            email: result.email,
            cpf: result.cpf
          }
          this.CostumerElementService.createElements(result)
            .subscribe((data: CostumerElement) => {
              this.dataSource.push(data);
              this.table.renderRows();
            });
            location.href = '/'
        }
      }
    });
  }

  deleteElement(cpf: string): void {
    this.CostumerElementService.deleteElement(cpf)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.cpf !== cpf);
      });
  }
}
