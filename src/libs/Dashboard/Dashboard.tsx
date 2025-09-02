import { Box, Divider, IconButton, type SxProps, type Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState, type ReactNode } from "react";


import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


import { setStateDecorator } from '../_helpers';

import { ContentBox } from './components/ContentBox';
import { DrawerToggleMenu } from './components/DrawerToggleMenu';
import { convertWidthToLeftPM } from './components/ListMemu/helpers';
import { ListMenu, ListMenuProps } from './components/ListMemu/ListMenu';
import { MuiFooter } from './components/MuiFooter';
import { MuiHeader, MuiHeaderProps } from './components/MuiHeader';
import { MuiMenu, MuiMenuProps } from './components/MuiMenu';
import { MuiMenuHeader } from './components/MuiMenuHeader';
import cn from 'classnames';



export type DashboardControlProps = Record<'handleMenuOpen' | 'handleMenuClose' | 'handleMenuToggle', () => void>
  & { isOpen: boolean }

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
    // listMenu?: Pick<ListMenuProps, 'sx'>;
  }
  classes?: Partial<Record<'listMenu' | 'header' | 'dashboard' | 'main', string>>;
}

const getSizeScroll = (el: HTMLElement) => {
  const { clientWidth, offsetWidth } = el;
  return offsetWidth - clientWidth;
}

let isEventScroll = false;

const DashboardMemo = forwardRef<DashboardControlProps, DashboardProps>(({ Footer, listMenu, children, HeaderContent, statuses, itemsProps, classes, columnMenu, styleList, sx }, ref) => {
  const theme = useTheme();
  /*#############-----------< Default init >----------############*/


  const isRight = (columnMenu?.position === 'right');
  const isWrapText = false;//по буквенный перенос пока отложил
  const isScrollIndentation = true //!!statuses?.isScrollIndentation
  const isHeaderDefault = statuses?.isHeaderDefault === undefined ? true : statuses?.isHeaderDefault;
  const isHeader = statuses?.isHeader === undefined ? true : statuses?.isHeader;
  const isMenu = statuses?.isMenu === undefined ? true : statuses?.isMenu;
  const initWidth = columnMenu?.initWidth || 250;


  const minWidthColumn = useMemo(() => {
  
    if(columnMenu?.minWidthColumn && Object.keys(columnMenu?.minWidthColumn).length){
      return columnMenu?.minWidthColumn
    }else{
      return {
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
          width: `calc(${theme.spacing(8)} + 1px)`,
        },
      }
    }
  }, [columnMenu?.minWidthColumn])

  /*--------------------------------------------------------------------------------------------*/
  /*--------------------------------------------------------------------------------------------*/

  const [state, setState] = useState({
    isOpen: !!statuses?.isDefaultOpen,
    widthCloseColumn: 0,
    widthScroll: 0,
  })
  const setStateHelper = setStateDecorator(state, setState);

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (isScrollIndentation && listRef.current) {
      const widthScroll = getSizeScroll(listRef.current);
      let isVisibleScroll = false;
      if (widthScroll > 0) { isVisibleScroll = true; }

      setStateHelper({ widthScroll:isVisibleScroll ? widthScroll + 1 : 0 });

      if (!isEventScroll) {
        window.onresize = function () {

          if (listRef.current) {  // console.dir('hidden');
            const widthScroll = getSizeScroll(listRef.current);
            if (isVisibleScroll && !widthScroll) {
              isVisibleScroll = false
              setStateHelper({ widthScroll: 0 });
            }

            if (!isVisibleScroll && widthScroll) {  // console.dir('visible');
              isVisibleScroll = true
              //Для точности добавляю 1px бордер от MuiPaper-root
              setStateHelper({ widthScroll: widthScroll + 1 });
            }
          }
        }
      }
    }
  }, [isScrollIndentation])



  /*#############-------------<{ Handlers }>-------------###############*/

  const handleMenuOpen = () => {
    setStateHelper({ isOpen: true });
  };
  const handleMenuClose = () => {
    setStateHelper({ isOpen: false });
  };
  const handleMenuToggle = () => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }))
  }


 

  /*#############-------------<{ Helpers }>-------------###############*/

  const config: DashboardControlProps = {
    isOpen: state.isOpen,
    handleMenuOpen,
    handleMenuClose,
    handleMenuToggle
  }
  useImperativeHandle(ref, () => config);
  return (
    <Box className={cn('Dashboard', classes?.dashboard)} sx={{ display: 'flex', height: 'inherit' }}>
      {
        (isHeader) ?
          isHeaderDefault
            ? (
              <MuiHeader
                initWidth={initWidth}
                isOpen={state.isOpen}
                bgColor={itemsProps?.MuiHeader?.bgColor}
                isRight={isRight}
                isHeaderResize={statuses?.isHeaderResize}
                sx={itemsProps?.MuiHeader?.sx}
                className={classes?.header}
                AfterComponent={itemsProps?.MuiHeader?.AfterComponent}
                children={typeof HeaderContent === 'function' ? HeaderContent(config) : HeaderContent}
                />
              )
              : (typeof HeaderContent === 'function' ? HeaderContent(config) : HeaderContent)
              : null
            }
  {
    isMenu && (
      <MuiMenu
      variant="permanent"
      open={state.isOpen}
      isRight={isRight}
      isWrapText={isWrapText}
      columnMenu={{ initWidth, minWidthColumn }}
      styleList={styleList}
    >
      {
        (statuses?.isMenuHeader !== false) && (
          <>
            <MuiMenuHeader />
            <Divider />
          </>
        )
      }
      <Box className='MuiListWrap' sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'hidden'
      }}>
        <ListMenu
          ref={listRef}
          columnMenu={{
            initWidth,
            ...(isScrollIndentation
              ? { minWidthColumn: convertWidthToLeftPM(minWidthColumn, { newProp: 'width', positionCorrect: `- ${state.widthScroll}px` }) }
              : { minWidthColumn })
          }}
          listMenu={listMenu}
          isOpen={state.isOpen}
          sx={{
            ...sx,
          }}
          className={classes?.listMenu}
          isWrapText={isWrapText}
          styleList={styleList}
        />
      </Box>
      {
        (statuses?.isButtonCenterMenu !== false) && (
          <DrawerToggleMenu >
            <IconButton onClick={handleMenuToggle} sx={{ pointerEvents: 'auto' }}>
              {state.isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerToggleMenu>
        )
      }

      {
        Footer && (
          <>
            <MuiFooter >
              <Divider />
              {Footer}
            </MuiFooter>
          </>
        )
      }
    </MuiMenu>
    )
  }
      <ContentBox className={cn('Dashboard-main', classes?.main)}>
        {(isHeader) && (<MuiMenuHeader />)}
        {children}
      </ContentBox>
    </Box>
  );
});

export const Dashboard = React.memo(DashboardMemo);

