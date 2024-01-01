'use client';
import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import style from './nav-item.module.css';


export interface CustomRoute {
  route: Route;
  name: string;
}

export interface NavItemProps {
  customRoute: CustomRoute
}

export const NavItem = ({ customRoute }: NavItemProps) => {
  const { route, name } = customRoute;
  const pathname = usePathname();
  const isActive = (route: string) => route === pathname;

  return (
    <li 
      className={ isActive(route)
                  ? `${style.sidebarListItem} ${style.sidebarListItemActive}`
                  : style.sidebarListItem }>
      <Link className={ isActive(route)
                  ? `${style.sidebarNavLink} ${style.sidebarNavLinkActive}`
                  : style.sidebarNavLink } href={ route }>{ name }</Link>
    </li>
  )
}
