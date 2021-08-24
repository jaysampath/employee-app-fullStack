import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Employee App</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/employees' activeClassName={classes.active}>
              All Employees
            </NavLink>
          </li>
          <li>
            <NavLink to='/new-employee' activeClassName={classes.active}>
              Add an Employee
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
