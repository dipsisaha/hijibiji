import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { NavbarData } from '../_model/navbar-data.model';
import { OrgConfig } from './navbar-org-config.model';
import { RoleConfig } from './navbar-role-config.model';
import { ApplicationSettings } from '../app.config'
import { ApplicationConstants } from '../app.constants'
import { Router } from '@angular/router';
import { UserDetails } from '../_model/user-details.model'

@Injectable()
export class NavbarService {
      private _config: OrgConfig[] = [            
            {
                "orgId": "",
                "appTitle": "",
                "logo":"",
                "logoClass":"",
                "logout" : ""//provide logout route path
                  
            }
      ];
      
       private _role: RoleConfig[] = [            
            {
                  "roleId": "",
                  "menuList": [
                  			   {"id":1,"description":"","link":"","icon":""},
                  		   	   {"id":2,"description":"","link":"","icon":""}] //provide menu items, each element in mennuList would be a menu item
            }
      ];

      private _showNavBar: BehaviorSubject<NavbarData> = new BehaviorSubject<NavbarData>(null);
      public showNavBarEmitter: Observable<NavbarData> = this._showNavBar.asObservable();

      constructor(private http: Http) { }


      showNavBarWithTitle(ifShow: boolean, orgId: string,roleId: string,username:string,stateUrl:string) {
            this._showNavBar.next(new NavbarData(ifShow, orgId,roleId,username,stateUrl));
      }
      
      loadConfig(): OrgConfig[] {
            return this._config;
      }
      
      loadRole(): RoleConfig[] {
            return this._role;
      }
}
