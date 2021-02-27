import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
@Injectable()
export class UtilService{
  private sidebarOpened = new BehaviorSubject<boolean>(false);
  sidebarOpened$ = this.sidebarOpened.asObservable();

  openSidebar(value:boolean):void{
    this.sidebarOpened.next(value);
  }
}
