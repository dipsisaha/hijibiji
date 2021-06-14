import { Component, OnInit,Inject } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { CommonService } from '../_services/common.service';
import { ApplicationConstants } from '../app.constants';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  orgName;
  model: any = {"username":"","password":""}; 
  constants = ApplicationConstants;
  timeoutInvoked =  false;
  
  constructor(private navbarService: NavbarService,
  			public router: Router,private activatedRoute: ActivatedRoute,private authService: AuthenticationService,
  			 private commonService: CommonService,
  			private idle: Idle) { 
  		
  		this.initializeUserIdleTimer();
  }

  ngOnInit() {
	localStorage.removeItem("user_details"); 
	this.navbarService.showNavBarWithTitle(false,'','','','' );
    let org = this.activatedRoute.snapshot.data['org'];
    this.orgName = org;
    
  }
	  
  login(){  
      let loginReqJson = {"username":this.model.username,"password":this.model.password,"org":this.orgName};
      this.authService.authenticateUser(loginReqJson).subscribe(res=>{
	      let userJson = {};
	      if(res && res.statuscode == 200){
	      	  this.commonService.initializeLoggedInUser(userJson,res.token); 
	      	  //Token refresh
	      	  setTimeout(()=>{
					 this.refreshToken();
			  }, this.constants.TOKEN_REFERSH_TIMESPAN); 
	          //IDLE Timer
	      	  this.startUserIdleActivity();
	      }else{
	      	alert("You are not authorized to access the application");
	      }
      },error => {
         console.log(error);
         console.log("Login failed");
         if(error.error && error.error.Payload == 400){
        	alert("You are not authorized to access the application");
         }
      });
  }
  
  refreshToken(){
  	if(sessionStorage.getItem('user_details')){  		
    	let userDetails = JSON.parse(sessionStorage.getItem('user_details'));
    	let loginReqJson = {"username":userDetails.username,"password":userDetails.password,"org":userDetails.orgName};
	    this.authService.authenticateUser(loginReqJson).subscribe(res=>{
		      let userJson = {};
		      if(res && res.statuscode == 200){
		      	  this.commonService.initializeLoggedInUser(userJson,res.token); 
		      	   setTimeout(()=>{
					 this.refreshToken();
			  	   }, this.constants.TOKEN_REFERSH_TIMESPAN); 
		      }else{
		      	  this.commonService.logout();
		      }
	    },error => {
	         console.log(error);
	         console.log("Silent Login failed");
	         this.commonService.logout();
	    });
	}else{
		this.commonService.logout();
	}
  }
  
  initializeUserIdleTimer(){
  	// sets an idle timeout of 5 seconds, for testing purposes.
    this.idle.setIdle(this.constants.USER_IDLE_BEGIN_TIME);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(this.constants.USER_IDLE_WAIT_TIME);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => console.log('No longer idle.'));
    this.idle.onTimeout.subscribe(() => {
      this.timedout();
    });
    this.idle.onIdleStart.subscribe(() => console.log('You\'ve gone idle!'));
    this.idle.onTimeoutWarning.subscribe((countdown) => console.log('You will time out in ' + countdown + ' seconds!'));
  }
  
  startUserIdleActivity() {
    this.idle.watch();
    console.log('Started.');
  }
  
  timedout(){  	
  	console.log("user session timed out");
  	if(!this.timeoutInvoked){
  		this.timeoutInvoked =  true;
  		this.idle.stop();
  		this.idle.onTimeout.observers.length = 0;
		this.idle.onIdleStart.observers.length = 0;
		this.idle.onIdleEnd.observers.length = 0;
		this.idle.onTimeoutWarning.observers.length = 0;
		alert("Session Expired !! Login again.");
		//common service . logout
		this.commonService.logout();
	}else{
		console.log("timeout already invoked");
	}
  }  
}
