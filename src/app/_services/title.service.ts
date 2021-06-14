import { Injectable } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

const APP_TITLE = 'Asset Management';

@Injectable()
export class TitleService {
  constructor( private router: Router,private activatedRoute: ActivatedRoute,private titleService: Title) {}

  init() {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => route.firstChild),
        switchMap(route => route.data),
        map((data) => {
          if (data.title) {
            // If a route has a title set (e.g. data: {title: "Foo"}) then we use it
            return data.title;
          } else {
          	return APP_TITLE;
          }
        })
      )
      .subscribe((pathString) => this.titleService.setTitle(`${pathString}`));
  }

  static ucFirst(string) {
    if ( !string ) { return string; }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}