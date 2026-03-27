import React, { type ReactNode } from "react";
import { type SxProps, type Theme } from '@mui/material';
import type { ListMenuProps, MuiHeaderProps, MuiMenuProps } from './components';




export type DashboardControlProps = Record<'handleMenuOpen' | 'handleMenuClose' | 'handleMenuToggle', () => void>
  & { isOpen: boolean, listRef:React.RefObject<HTMLUListElement> }

type Statuses_OR = 'isDefaultOpen' | 'isHeader' | 'isMenu' | 'isMenuHeader' | 'isHeaderResize' | 'isButtonCenterMenu' | 'isHeaderDefault';

export interface DashboardProps extends Pick<ListMenuProps, 'listMenu' | 'styleList'> {
  Footer?: ReactNode;
  columnMenu?: Partial<MuiMenuProps['columnMenu'] & { position?: 'right' | 'left' }>;
  children?: ReactNode;
  // colors?: Partial<Record<'scroll', string>>
  HeaderContent?: ReactNode | ((config: DashboardControlProps) => React.ReactNode);
  statuses?: Partial<Record<Statuses_OR, boolean>>;
  sx?: SxProps<Theme>,
  itemsProps?: {
    MuiHeader?: Pick<MuiHeaderProps, 'sx' | 'bgColor' | 'AfterComponent'>;
    MuiListMenu?: Pick<ListMenuProps, 'sx'>;
  }
  classes?: Partial<Record<'listMenu' | 'header' | 'dashboard' | 'main', string>>;
}
