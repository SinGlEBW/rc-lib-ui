import React, { forwardRef, Fragment, useMemo, useState, type ReactNode } from "react";
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import type { CSSObject } from '@mui/material';
import { Collapse, List, ListItem, type SxProps, type Theme } from '@mui/material';
import { ControlStatusItem } from '../../../common/ControlStatusItem';

import { ListButton, ListButtonProps } from './ui/ListButton';
import { ListText, type ListTextProps } from './ui/ListText';
import { MuiNavLink } from './ui/MuiNavLink';
import { RenderIcon, RenderIconProps } from './ui/RenderIcon';
import { RenderList, type RenderListProps } from './ui/RenderList';
import cn from 'classnames';
import { StyledListItem } from './ui/styled';

interface ItemListMenuCommonProps extends
  Pick<RenderIconProps, 'icon'>,
  Pick<ListTextProps, 'title'>,
  Pick<ListButtonProps, 'onClick'> {
  action?: ReactNode;
  sx?: SxProps<Theme>;
}

type OneVariantMenuList = {
  children?: Array<ItemListMenuCommonProps & { to: string }>;
  to?: never;
}
type TwoVariantMenuList = {
  children?: never;
  to?: string;
}

type VariantsMenuListProps = | OneVariantMenuList | TwoVariantMenuList;


export interface ListMenuProps extends RenderListProps {
  listMenu: Array<VariantsMenuListProps & ItemListMenuCommonProps>;
  isOpen: boolean;
  sx?: SxProps<Theme>;
  className?: string;
  isWrapText?: boolean;
  size?: 'normal' | 'small';
  isRight?: boolean;
  columnMenu: {
    initWidth: number;

    minWidthColumn: Pick<CSSObject, 'width'>;
  };
}


const getDefaultPadding = ({isIcon}) => {
  return {['paddingRight']: 1.2, ...(!isIcon && { ['paddingLeft']: 1.2 })}
}


const ListMenuMemo = forwardRef<HTMLUListElement, ListMenuProps>(({ styleList = 'variant1', isRight, columnMenu, isWrapText = false, listMenu, isOpen, sx, className }, ref) => {
  const { minWidthColumn } = columnMenu;
  const [muiSelected, setID] = useState('')

 
  const childrenList = useMemo(() => {
    return (listMenu).map(({ action, icon, title, sx = {}, onClick, children, to, }, index) => {
      const key = `${index}`;
      const handleClick1 = (e) => {
        setID(key);
        onClick && onClick(e);
      }
      if (children && Array.isArray(children)) {
        return (
          <Fragment key={index}>
            <ControlStatusItem
              defaultStatus={isOpen}
              render={(config) => (
                <>
                  <StyledListItem disablePadding sx={sx} visual={styleList}>
                    <ListButton
                      isOpen={config.is}
                      isWrapText={isWrapText}
                      onClick={(e) => {
                        config.handleToggle();
                        typeof onClick === 'function' && onClick(e);
                      }}
                      sx={{...getDefaultPadding({isIcon: icon}) }}
                    >
                      {
                        icon && (
                          <RenderIcon
                            icon={icon}
                            sx={minWidthColumn}
                          />
                        )
                      }
                      <ListText
                        unmount={!isOpen}
                        title={title}
                        sx={{ flexGrow: 1}}
                        isWrapText={isWrapText}
                      />
                      {
                        isOpen && (
                          <>
                            {action}
                            {config.is ? <ExpandLess /> : <ExpandMore />}
                          </>
                        )
                      }
                    </ListButton>
                  </StyledListItem>
                  <Collapse in={config.is && isOpen} timeout="auto" unmountOnExit>
                    <List disablePadding >
                      {
                        children.map(({ action, icon, title, to, sx = {}, onClick }, inx) => {
                          const key = `${index}-${inx}`;
                          const handleClick2 = (e) => {
                            setID(key);
                            onClick && onClick(e);
                          }
                          return (
                            <StyledListItem key={key} disablePadding sx={sx} visual={styleList}>
                              <ListButton
                                sx={{ ['paddingRight']: 1.2, ...(!icon && { ['paddingLeft']: 2.5 }) }}
                                isOpen
                                onClick={handleClick2}
                                isWrapText={isWrapText}
                                {...(to ? { to, component: MuiNavLink } : { to: '', className: cn({ 'Mui-selected': muiSelected === key }) })}

                              >
                                {
                                  icon && (
                                    <RenderIcon icon={icon} sx={{...minWidthColumn, marginLeft: '0 !important'}}/>
                                  )
                                }
                                <ListText
                                  unmount={!isOpen}
                                  title={title}
                                  isWrapText={isWrapText}
                                />
                                {isOpen && action}
                              </ListButton>
                            </StyledListItem>
                          )
                        })
                      }
                    </List>
                  </Collapse>
                </>
              )} />
          </Fragment>
        )
      }

      return (
        <StyledListItem key={index} disablePadding sx={sx} visual={styleList} >
          <ListButton
            isOpen={isOpen}
            onClick={handleClick1}
            isWrapText={isWrapText}
            {...(to ? { to, component: MuiNavLink } : { to: '', className: cn({ 'Mui-selected': muiSelected === key }) })}
            sx={{...getDefaultPadding({isIcon: icon}) }}

          >
            {icon && <RenderIcon icon={icon} sx={minWidthColumn} />}
            <ListText
              unmount={!isOpen}
              title={title}
              isWrapText={isWrapText}
            />
            {isOpen && action}
          </ListButton >
        </StyledListItem>
      )
    })
  }, [listMenu, isOpen, muiSelected, isRight, getDefaultPadding])

  return (
    <RenderList
      ref={ref}
      styleList={styleList}
      sx={sx}
      className={className}
      children={childrenList}
    />
  )
});

export const ListMenu = React.memo(ListMenuMemo);




