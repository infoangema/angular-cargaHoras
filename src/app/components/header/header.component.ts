import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(private permissionsService: NgxPermissionsService,) { }

  ngOnInit(): void {
    const permissions = this.permissionsService.getPermissions();
  }
}
