// import { Dashboard, DashboardProps, type DashboardControlProps } from '@lib/index';
import { Dashboard, DashboardProps, type DashboardControlProps } from '@lib/Dashboard';
import { useEffect, useRef } from 'react';
// import { Preloaders } from '../dist'
// import { Preloaders } from 'rc-lib-ui'
import { Archive } from '@mui/icons-material';
import { Chip } from '@mui/material';




// const handlePopoverButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//   event.stopPropagation();
// };
// const popoverMenuAction = (
//   <Fragment>
//     <IconButton onClick={handlePopoverButtonClick}>
//       <MoreHorizIcon />
//     </IconButton>
//     <Menu
//       open={false}
//       anchorEl={null}
//       onClose={() => { }}
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'right',
//       }}
//       disableAutoFocus
//       disableAutoFocusItem
//     >
//       <MenuItem onClick={() => { }}>New call</MenuItem>
//       <MenuItem onClick={() => { }}>Mark all as read</MenuItem>
//     </Menu>
//   </Fragment>
// );

const listMenu = [
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    path: '/test',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    path: '/test2',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    path: '/test3',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    path: '/test4',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    path: '/test5',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    path: '/test6',
    action: <Chip label={7} color="primary" size="small" />,
  },

] as DashboardProps['listMenu']



export const App = () => {

  const dashboardControlRef = useRef<DashboardControlProps>(null)

  // const handleMenuToggle = () => {
  //   dashboardControlRef.current?.handleMenuToggle()
  // }




  return (
    <>
      <Dashboard
        ref={dashboardControlRef}
        styleList='variant2'
        listMenu={listMenu}
        Footer={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
            Footer
          </div>
        }
        columnMenu={{
          initWidth: 280,
          minWidthColumn: {
            width: 53, //min 40
          },
          // position: "right",
        }}
        // HeaderContent={
        //   <header style={{ position: "fixed", zIndex: 1, width: "100%", backgroundColor: "#456789" }}>
        //     <Toolbar>
        //       <IconButton onClick={handleMenuToggle} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} children={<MenuIcon />} />
        //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} children={"App"} />
        //     </Toolbar>
        //   </header>
        // }
        itemsProps={{MuiHeader: {AfterComponent: <div>Заголовок</div>}, }}
        statuses={{
          isHeaderDefault: true,
          isButtonCenterMenu: true,
          // isScrollIndentation: true
          //isHeader: false, full off header
        }}
        children={(
          <div className={'content'} style={{ position: 'relative' }} >
            Контент
          </div>
        )}
      />
    </>
  )
}


