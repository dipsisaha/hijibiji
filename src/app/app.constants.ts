export class ApplicationConstants {
    public static DATE_FORMAT = 'yyyy-MM-dd';
    public static TIME_FORMAT = 'HH:mm';
    public static TIME_ZONE = 'EST';
    
    public static USER_IDLE_BEGIN_TIME = 600; //system will wait for specified sec before mrking user as idle (10min)
    public static USER_IDLE_WAIT_TIME = 300;//system will wait for specified sec after user is marked idle and before timeout is done (10 + 5 = 15 mins)
    
    public static TOKEN_REFERSH_TIMESPAN = 1800000; //1 hours - 3600000, 55 mins - 3300000
    
	
}