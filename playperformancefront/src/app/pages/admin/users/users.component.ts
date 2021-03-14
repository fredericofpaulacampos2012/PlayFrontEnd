import { MatSelectModule } from '@angular/material/select';
import { ModalComponent } from './../components/modal/modal.component';
import { User } from './../../../shared/models/user.interface';
import { UsersService } from './../services/users.service';
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

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
    'telefone',
    'cidade',
    'uf',
    'action'
  ];
  dataSource = new MatTableDataSource();
  user:User[]=[];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor(private userSvc:UsersService, private dialog: MatDialog){

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
  onOpenModal(title:string , modo:string ,user={}):void{
    const dialogRef = this.dialog.open(ModalComponent,{
      height:'520px',
      width:'650px',
      hasBackdrop:false,
      data:{
        title:title,
        mode:modo,
        user:user
      }
    });
  }
  onDelete(userId:string):void{
      if(window.confirm('Tem certeza de que deseja Apagar este Cliente?')){
        this.userSvc.deleteUser(userId).subscribe((res)=>{
          window.alert(res);
        });
      }
  }
}
