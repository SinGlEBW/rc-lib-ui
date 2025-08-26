import React, { forwardRef, Fragment, useMemo, type ReactNode } from "react";
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import type { CSSObject } from '@mui/material';
import { Collapse, List, ListItem, type SxProps, type Theme } from '@mui/material';
import { ControlStatusItem } from '../../../common/ControlStatusItem';
import { convertWidthToLeftPM } from './helpers';

import { ListButton, ListButtonProps } from './ui/ListButton';
import { ListText, type ListTextProps } from './ui/ListText';
import { MuiNavLink } from './ui/MuiNavLink';
import { RenderIcon, RenderIconProps } from './ui/RenderIcon';
import { RenderList, type RenderListProps } from './ui/RenderList';


interface ItemListMenuCommonProps extends
  Pick<RenderIconProps, 'icon'>,
  Pick<ListTextProps, 'title'>,
  Pick<ListButtonProps, 'onClick'> {
  action?: ReactNode;
  sx?: SxProps<Theme>;
}

type OneVariantMenuList = {
  children?: Array<ItemListMenuCommonProps & { path: string }>;
  path?: never;
}
type TwoVariantMenuList = {
  children?: never;
  path?: string;
}

type VariantsMenuListProps = | OneVariantMenuList | TwoVariantMenuList;


export interface ListMenuProps extends RenderListProps {
  listMenu: Array<VariantsMenuListProps & ItemListMenuCommonProps>;
  isOpen: boolean;
  sx?: SxProps<Theme>;
  className?: string;
  isWrapText?: boolean;
  size?: 'normal' | 'small';
  columnMenu: {
    initWidth: number;
    minWidthColumn: Pick<CSSObject, 'width'>;
  };
}



const ListMenuMemo = forwardRef<HTMLUListElement, ListMenuProps>(({ styleList = 'variant1', columnMenu, isWrapText = false, listMenu, isOpen, sx, className }, ref) => {
  const { minWidthColumn } = columnMenu;
  const mlSx = useMemo(() => convertWidthToLeftPM(minWidthColumn, { newProp: 'marginLeft'}), [minWidthColumn])


  const childrenList = useMemo(() => {
    return (listMenu).map(({ action, icon, title, sx = {}, onClick, children, path, }, index) => {

      if (children && Array.isArray(children)) {
        return (
          <Fragment key={index}>
            <ControlStatusItem
              render={(config) => (
                <>
                  <ListItem disablePadding sx={sx}>
                    <RenderIcon
                      icon={icon}
                      sx={minWidthColumn}
                    />
                    <ListButton
                      isOpen={isOpen}
                      isWrapText={isWrapText}
                      onClick={(e) => {
                        config.handleToggle();
                        typeof onClick === 'function' && onClick(e);
                      }}
                    >
                      <ListText
                        unmount={!isOpen}
                        title={title}
                        sx={{ flexGrow: 1, ...mlSx, }}
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
                  </ListItem>
                  <Collapse in={config.is && isOpen} timeout="auto" unmountOnExit>
                    <List disablePadding >
                      {
                        children.map(({ action, icon, title, path, sx = {}, onClick }, inx) => {
                   
                          return (
                            <ListItem key={`${index}-${inx}`} disablePadding sx={sx}>
                              <ListButton
                                to={path}
                                component={MuiNavLink}
                                sx={({ spacing }) => ({ ...!icon && { paddingLeft: spacing(2) } })}
                                isOpen
                                onClick={onClick as any}
                                isWrapText={isWrapText}
                              >
                                <RenderIcon
                                  icon={icon}
                                  sx={minWidthColumn}
                                />
                                <ListText
                                  sx={() => ({ ...(icon && mlSx) })}
                                  unmount={!isOpen}
                                  title={title}
                                  isWrapText={isWrapText}
                                />
                                {isOpen && action}

                              </ListButton>
                            </ListItem>
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
        <ListItem key={index} disablePadding sx={sx}>
          <RenderIcon icon={icon} sx={minWidthColumn}  />
          <ListButton component={MuiNavLink} to={path as string} isOpen={isOpen} onClick={onClick as any} isWrapText={isWrapText} >
            <ListText sx={mlSx} unmount={!isOpen} title={title} isWrapText={isWrapText} />
            {isOpen && action}
          </ListButton >
        </ListItem>
      )
    })
  }, [listMenu, isOpen, mlSx])

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



