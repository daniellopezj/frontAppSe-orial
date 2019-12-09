import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-nav-applicaction',
  templateUrl: './nav-applicaction.component.html',
  styleUrls: ['./nav-applicaction.component.scss']
})
export class NavApplicactionComponent implements OnInit{

  @ViewChild('drawer', {static: false}) drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
  
  ngOnInit() {
 
  }

  hideShow(){
    if (window.screen.width <= 600) { 
    this.drawer.toggle();
     console.log("pequeño")
    }
  }
}
