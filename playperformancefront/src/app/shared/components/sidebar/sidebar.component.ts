import { UtilService } from './../../services/utils.service';
import { AuthService } from './../../../pages/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authSvc:AuthService,private utilSvc:UtilService) { }

  ngOnInit(): void {
  }

  onExit():void{
    this.authSvc.logout();
    this.utilSvc.openSidebar(false);
  }

}
