import React, { FC } from "react";
import { Container, AppBar as MuiAppBar, styled, Toolbar, type SxProps, type Theme } from '@mui/material';
import { Utils } from '../../_helpers';


export interface MuiHeaderProps extends AppBarProps {
  className?: string;
  sx?:SxProps<Theme>,
  AfterComponent?: React.ReactNode
}

const MuiHeaderMemo: FC<MuiHeaderProps> = ({
  initWidth,
  isOpen,
  children,
  isRight,
  isHeaderResize = true,
  bgColor,
  className,
  AfterComponent,
  sx
}) => {

  return (
    <AppBar
      className={className}
      bgColor={bgColor}
      isRight={isRight}
      position="fixed"
      initWidth={initWidth}
      isOpen={isOpen}
      isHeaderResize={isHeaderResize}
      sx={sx}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ flexGrow: 1 }} disableGutters>
          {children}
        </Toolbar>
      </Container>
      {AfterComponent && AfterComponent}
    </AppBar>
  )
};

export const MuiHeader = React.memo(MuiHeaderMemo);



interface AppBarProps {
  isOpen: boolean;
  children?: React.ReactNode;
  isRight: boolean;
  isHeaderResize?: boolean;
  initWidth?: number;
  bgColor?: string;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (propName) => !['isOpen', 'isRight', 'initWidth', 'bgColor', 'isHeaderResize'].includes(propName as string)
})<AppBarProps>(({ theme, isOpen, isRight, initWidth = 250, bgColor = 'primary', isHeaderResize }) => {

  const _bgColor = Utils.colors.getColorPalette(theme, bgColor);

  return {
 
    backgroundColor: _bgColor,
    zIndex: theme.zIndex.drawer + 1,
    color: 'info.main',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(isOpen && {
      ...(isRight ? { marginRight: initWidth } : { marginLeft: initWidth } ),
      width: `calc(100% - ${initWidth}px)`,
      ...(!isHeaderResize && { width: '100%', zIndex: 3, margin: 0 }),
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    })
  }
});

