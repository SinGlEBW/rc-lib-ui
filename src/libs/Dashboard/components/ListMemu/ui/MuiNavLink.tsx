import React, { forwardRef } from "react";
import { NavLink, type NavLinkProps } from 'react-router-dom';


export interface MuiNavLinkProps extends  Omit<NavLinkProps, 'className'>{
  className: string;
}



const MuiNavLinkMemo = forwardRef<any, MuiNavLinkProps>(({className = '', ...props}, ref) => (
  <NavLink
    ref={ref}
    className={({ isActive }) => {
      return (isActive ? className + ' Mui-selected' : className)
    }}
    end
    {...props}
  />
));

export const MuiNavLink = React.memo(MuiNavLinkMemo);

