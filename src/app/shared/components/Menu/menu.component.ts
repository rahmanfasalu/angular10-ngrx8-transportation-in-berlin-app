import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.style.scss'],
})
export class MenuComponent implements OnInit {
  pageTitle = 'Berlin city travel planner';
  ngOnInit() {}
}
