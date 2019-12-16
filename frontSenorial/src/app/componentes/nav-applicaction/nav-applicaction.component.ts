import { ServiceCleanService } from './../../Services/service-clean.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { WebsocketService } from 'src/app/Services/websocket.service';
import { Title } from '@angular/platform-browser';

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

  constructor(private breakpointObserver: BreakpointObserver, private cleanService:ServiceCleanService,private websocket: WebsocketService,private titleService: Title ) {
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
      console.log(data);
      this.countNotifications = data;
      this.compareNotification();
    })
  }

  hideShow() {
    if (window.screen.width <= 600) {
      this.drawer.toggle();
    }
  }
}
