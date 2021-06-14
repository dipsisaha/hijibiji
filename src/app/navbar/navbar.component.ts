import { Component, OnInit,Inject } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';
import { NavbarService } from './navbar.service';
import { CommonService } from '../_services/common.service';
import { OrgConfig } from './navbar-org-config.model'
import { RoleConfig } from './navbar-role-config.model'
import { Menu } from './navbar-menu.model'
import { ApplicationSettings } from '../app.config'
import { DOCUMENT } from '@angular/common';
import { ApplicationConstants } from '../app.constants'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constants= ApplicationConstants;
  showNavbar: boolean = false;
  orgConfig: any = {}
  roleConfig: any = {}
  currentOrg: OrgConfig = null;
  currentRole: RoleConfig = null;
  userName: String = "";
  public isCollapsed: boolean = false;
  loanType = "";
  userData:any={};
  orgName;
 
  poNumber;
  
  constructor(@Inject(DOCUMENT) private document: any,private serviceInstance: NavbarService, private router: Router, private commonService: CommonService) {
    this.serviceInstance.loadConfig().forEach((item: OrgConfig) => {
        this.orgConfig[item.orgId] = item;
        console.log("Config Done!!");
        this.subscribeToChangeEvent();
    });
    
    this.serviceInstance.loadRole().forEach((item: RoleConfig) => {
        this.roleConfig[item.roleId] = item;
        console.log("Role Config Done!!");
        this.subscribeToChangeEvent();
    });
    
    

    if (sessionStorage.getItem("menu-config") == null) {      
      console.log("Wait for initialization to complete");
    } else {
      let temp = sessionStorage.getItem("menu-config");
      let orgId:string = JSON.parse(temp).orgId;
      let roleId:string = JSON.parse(temp).roleId;
      let username = JSON.parse(temp).username;
      let stateURL = JSON.parse(temp).stateURL;
      if (orgId == null){
        console.log('Waiting from initialization')
      }else{
        this.showNavbar = true;
        this.currentOrg = this.orgConfig[orgId];
        this.currentRole = this.roleConfig[roleId];
        this.userName = username;                  
        console.log(this.currentOrg);
        console.log(this.currentRole);
        this.orgName = orgId;
      }
    }
    console.log("Navbar need to be persisted");

  }
  subscribeToChangeEvent() {
    this.serviceInstance.showNavBarEmitter.subscribe((navData) => {
      if (navData != null) {
        console.log("Change in navbar detected");
        this.showNavbar = navData.showNav;
        if (this.showNavbar == true) {
          if (navData.orgId && navData.roleId) {
            this.currentOrg = this.orgConfig[navData.orgId];
            this.currentRole = this.roleConfig[navData.roleId];
            this.userName = navData.username;
            sessionStorage.setItem("menu-config", JSON.stringify(navData));
          }
        } else {
          this.currentOrg = null;
          this.currentRole = null;
          sessionStorage.removeItem("menu-config");
        }	
      }
      
    });
  }
  
  ngOnInit() {    
    
  }

  changeNavigation(desc,link){  	
  	this.router.navigate([link]);
  }
  
  
  /**
   * Logout link
  */
  logout(link){
  	this.commonService.logout();  
  }
}
	