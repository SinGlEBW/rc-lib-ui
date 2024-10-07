import { Drawer, styled, type CSSObject, type DrawerProps, type Theme } from '@mui/material';
/* TODO: Разработать в будущем swipe версию как отдельный компонент  */

const openedMixin = (theme: Theme, initWidth: number, isAnimation: boolean = true): CSSObject => ({
  width: initWidth,
  ...(isAnimation && {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  }),
  overflow: 'hidden',
});

const closedMixin = (theme: Theme, minWidth: MuiMenuProps['columnMenu']['minWidthColumn'], isAnimation: boolean = true): CSSObject => ({
  ...(isAnimation && {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  }),

  overflow: 'hidden',
  ...minWidth
  // width: `calc(${theme.spacing(7)} + 1px)`,
  // [theme.breakpoints.up('sm')]: {
  //   width: `calc(${theme.spacing(8)} + 1px)`,
  // },
});



export interface MuiMenuProps extends DrawerProps {
  isRight: boolean;
  isWrapText?: boolean;
  columnMenu: {
    initWidth: number;
    minWidthColumn: Pick<CSSObject, 'width'>;
  };
  styleList?: 'variant1' | 'variant2';
}

export const MuiMenu = styled(Drawer, {
  shouldForwardProp: (prop) => !['open', 'isWrapText', 'columnMenu', 'isRight', 'styleList'].includes(prop as string),

})<MuiMenuProps>(
  ({ theme, open, isRight, columnMenu }) => {
    const position = !isRight ? 'Right' : 'Left';
    const initWidth = columnMenu.initWidth;
    const minWidth = columnMenu.minWidthColumn;

    return {
      width: initWidth,
      position: 'relative',
      zIndex: 0,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      [`border${position}`]: `1px solid ${theme.palette.divider}`,
      ...(isRight ? { order: 1 } : { order: 0 }),
 
      ...(open ? openedMixin(theme, initWidth) : closedMixin(theme, minWidth)),
  
      '& .MuiDrawer-paper': {
        position: 'static',
       
        // при isWrapText - при открытии меню текст сжатый и значки смешаются поэтому ставим условие  
        ...(open ? openedMixin(theme, initWidth) : closedMixin(theme, minWidth)),
        // ...(open ? openedMixin(theme, initWidth) : closedMixin(theme, isWrapText ? { width: initWidth } : minWidth))
     
      }
    }
  },
);


