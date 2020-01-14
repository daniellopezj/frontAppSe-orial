import { ChangePassComponent } from './../change-pass/change-pass.component';
import { ServiceCleanService } from './../../Services/service-clean.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav, MatDialog } from '@angular/material';
import { WebsocketService } from 'src/app/Services/websocket.service';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-applicaction',
  templateUrl: './nav-applicaction.component.html',
  styleUrls: ['./nav-applicaction.component.scss']
})
export class NavApplicactionComponent implements OnInit {

  @ViewChild('drawer', { static: false }) drawer: MatSidenav;
  countNotifications: any ="";
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog, private router: Router, private authenticationService: AuthenticationService, private cleanService:ServiceCleanService,private websocket: WebsocketService,private titleService: Title ) {
    this.cleanService.requestCountPending().subscribe(res=>{
      this.countNotifications = res.object;
     this.compareNotification();
    })
  }

  compareNotification(){
    if(this.countNotifications == 0){
      this.countNotifications = "";
    }else{
      this.countNotifications = "("+  this.countNotifications + ")";
    }
    this.titleService.setTitle(this.countNotifications+" Señorial");
  }

  ngOnInit() {
    this.websocket.listen('countPending').subscribe((data) => {
      this.countNotifications = data;
      this.compareNotification();
    })
  }

  hideShow() {
    if (window.screen.width <= 600) {
      this.drawer.toggle();
    }
  }

  logOut(){
    this.authenticationService.logout();
    this.router.navigate(['/login'])
  }

  openChangePass(){
   
    const dialogRef = this.dialog.open(ChangePassComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("cierro dialog")
    });
  }
}
