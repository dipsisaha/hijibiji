import { Menu } from './navbar-menu.model';
export class RoleConfig {
    constructor(public roleId: string, public menuList: Menu[]) { };
}