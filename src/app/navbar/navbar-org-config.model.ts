import { Menu } from './navbar-menu.model';
export class OrgConfig {
    constructor(public orgId: string, public appTitle: string, public logo: string,public logoClass:string,public logout:string) { };
}