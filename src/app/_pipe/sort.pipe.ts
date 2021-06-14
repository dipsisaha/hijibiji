
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  /**
   * Check if a value is a string
   *
   * @param value
   */
  static isString(value: any) {
    return typeof value === 'string' || value instanceof String;
  }

  /**
   * Sorts values ignoring the case
   *
   * @param a
   * @param b
   */
  static compareVal(a: any, b: any,type:any) {
  
    if(type == 'string'){
	    if (SortPipe.isString(a) && SortPipe.isString(b)) {
	      return a.localeCompare(b);
	    }
	}else if(type == 'date'){
		a= new Date(a).getTime();		
		b = new Date(b).getTime();	
		return a > b ? 1 : -1;	
	}else if(type=='mix'){
	    if(a && b){
			return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])));
		}else if(a){
			return 1
		}else{ return -1}
	}else if(type=='array'){
	    if(a && b){
			return JSON.stringify(a).localeCompare(JSON.stringify(b));
		}else if(a){
			return 1
		}else{ return -1}
	}
    return a > b ? 1 : -1;
  }

  /**
   * Parse expression, split into items
   * @param expression
   * @returns {string[]}
   */
  static parseExpression(expression: string): string[] {
    expression = expression.replace(/\[(\w+)\]/g, '.$1');
    expression = expression.replace(/^\./, '');
    return expression.split('.');
  }

  /**
   * Get value by expression
   *
   * @param object
   * @param expression
   * @returns {any}
   */
  static getValue(object: any, expression: string[]) {
    for (let i = 0, n = expression.length; i < n; ++i) {
      const k = expression[i];
      if (!(k in object)) {
        return;
      }
      object = object[k]; /// This is the application specific hack to make the sorting work
    }

    return object;
  }

  /**
   * Set value by expression
   *
   * @param object
   * @param value
   * @param expression
   */
  static setValue(object: any, value: any, expression: string[]) {
    let i;
    for (i = 0; i < expression.length - 1; i++) {
      object = object[expression[i]];
    }

    object[expression[i]] = value;
  }

  transform(value: any | any[], expression?: any,type?: any, reverse?: boolean): any {
    if (!value) {
      return value;
    }
    
    if (Array.isArray(value)) {
      return this.sortArray(value, expression,type, reverse);
    }
    
    if (typeof value === 'object') {
      return this.transformObject(value, expression,type, reverse);
    }

    return value;
  }

  /**
   * Sort array
   *
   * @param value
   * @param expression
   * @param reverse
   * @returns {any[]}
   */
  private sortArray(value: any[], expression?: any,type?: any, reverse?: boolean): any[] {
   
    let array: any[] = value.sort((a: any, b: any): number => {
      if (!expression) {
        return SortPipe.compareVal(a, b,type);
      }
      if (expression) {
        if (a && b) {
            return SortPipe.compareVal(a[expression], b[expression],type);
        }
        return SortPipe.compareVal(a, b,type);        
      }     
    });

    if (reverse) {
      return array.reverse();
    }

    return array;
  }


  /**
   * Transform Object
   *
   * @param value
   * @param expression
   * @param reverse
   * @returns {any[]}
   */
  private transformObject(value: any | any[], expression?: any, type?: any,reverse?: boolean): any {

    let parsedExpression = SortPipe.parseExpression(expression);
    let lastPredicate = parsedExpression.pop();
    let oldValue = SortPipe.getValue(value, parsedExpression);

    if (!Array.isArray(oldValue)) {
      parsedExpression.push(lastPredicate);
      lastPredicate = null;
      oldValue = SortPipe.getValue(value, parsedExpression);
    }

    if (!oldValue) {
      return value;
    }

    SortPipe.setValue(value, this.transform(oldValue, lastPredicate, type,reverse), parsedExpression);
    return value;
  }
}