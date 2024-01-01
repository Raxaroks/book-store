import style from './sidebar.module.css';
import { CustomRoute, NavItem } from '../NavItem/NavItem';


export const Sidebar = () => {
  const navigationItems: CustomRoute[] = [
    { route: '/books', name: 'View all books' },
    { route: '/books/create', name: 'Create a new book' }
  ];

  return (
    <nav className={ style.sidebar }>
      <ul className={ style.sidebarList }>
        {
          navigationItems.map( (cr, index) => (
            <NavItem key={ index } customRoute={ cr } />
          ) )
        }
      </ul>

      <footer className={ style.sidebarFooter }>
        &copy; 2023. Developed by Andrés Ornelas. All rights reserved.
      </footer>
    </nav>
  )
}
