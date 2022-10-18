import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  enableEmail: Boolean;

  constructor(private location: Location) {
    this.enableEmail = false;
   }

  ngOnInit(): void {
  }

  addEmail(){
    this.enableEmail = this.enableEmail===false ? this.enableEmail=true : this.enableEmail=false;
  }

  back(){
    this.location.back();
  }
}
