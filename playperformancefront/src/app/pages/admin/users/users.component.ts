import { UsersService } from './../services/users.service';
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nome',
    'role',
    'email',
    'cpf',
    'telefone',
    'cidade',
    'uf'
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private userSvc:UsersService){

  }
  ngOnInit():void{
    this.userSvc.getAllUsers().subscribe(users=>{
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit():void {
    this.dataSource.sort = this.sort;
  }
}
