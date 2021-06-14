
import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'dateToUTC'
})
export class DateFormatPipe implements PipeTransform {


  transform(inputdate: string): any {
    let parsedDate = new Date(inputdate);
  	
  	let dateStr = parsedDate.getFullYear()+'-'+this.prefixZero((parsedDate.getMonth()+1))+'-'+this.prefixZero(parsedDate.getDate())
  							+'T'+this.prefixZero(parsedDate.getHours())+':'+this.prefixZero(parsedDate.getMinutes())+':'+this.prefixZero(parsedDate.getSeconds())
  							+"Z";
  	let utcDate = new Date(dateStr);
  	return utcDate.toUTCString();
  }
  
  prefixZero(value){
  	if(value < 10){
  		value = '0'+value;
  	}
  	return value
  }
}