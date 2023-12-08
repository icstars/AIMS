import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { ToolsService } from './services/tools.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { CoreService } from './core/core.service';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
//form for tools
export class AppComponent implements OnInit{
  displayedColumns: string[] = [
  'id',
  'toolID', 
  'graphiteBlockID', 
  'toolQuality', 
  'toolSize',
  'location',
  'dateReceived',
  'action',
];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

//light-dark theme
  switchTheme = new FormControl(false)
  @HostBinding('class') 
  className = ''
  darkClass = 'theme-dark'
  lightClass = 'theme-light'

  

  constructor(
    private _dialog: MatDialog, 
    private _empService: ToolsService,
    private _coreService: CoreService,
    private overlay: OverlayContainer,
    private observer: BreakpointObserver,

  ) {}

  
//sidenav bar function
  ngAfterViewInIt() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
//switches between light and dark mode
  ngOnInit(): void {

    this.switchTheme.valueChanges.subscribe((currentMode) => {
      this.className = currentMode ? this.darkClass : this.lightClass

      if(currentMode) {
        this.overlay.getContainerElement().classList.add(this.darkClass)
      }

      else {
        this.overlay.getContainerElement().classList.remove(this.darkClass)

      }
    })



    this.getToolList();
  }
  
  
  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getToolList();
        }
      },
    });
  }

  getToolList() {
    this._empService.getToolList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteTool(id: number) {
    if(confirm('Are you sure you want to delete this tool?'))
    
    this._empService.deleteTool(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Tool Deleted', 'done');
        this.getToolList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any){
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getToolList();
        }
      },
    });
    
  }
}

