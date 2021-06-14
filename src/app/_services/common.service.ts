import { Injectable,Output , EventEmitter, } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationConstants } from '../app.constants';
import { NavbarService } from '../navbar/navbar.service';

@Injectable()
export class CommonService {
@Output() public spinner:EventEmitter<boolean>=null;
	
	   	
    constructor(private navbarService: NavbarService,public router: Router) {
        this.spinner = new EventEmitter<boolean>();
    }  
    
    logout(){    	
    	//check the user role and redirect accordingly 
        sessionStorage.removeItem("menu-config");
	  	localStorage.clear();
	    sessionStorage.clear();    
    }
    
    
    initializeLoggedInUser(userJson,token){
	  	  //userdetails
		  sessionStorage.setItem("user_details",JSON.stringify(userJson));
		  //token   
		  sessionStorage.setItem("token", JSON.stringify(token)); 		 
    }
  
}
