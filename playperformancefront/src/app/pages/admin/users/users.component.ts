import { User } from './../../../shared/models/user.interface';
import { UsersService } from './../services/users.service';
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
  user:User[]=[];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor(private userSvc:UsersService){

  }
  ngOnInit():void{
    this.userSvc.getAllUsers().subscribe(users=>{
      this.dataSource.data = users;
      this.user = users;
    });
  }

  ngAfterViewInit():void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyfilter(event: Event ){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
