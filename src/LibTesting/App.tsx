// import { Dashboard, DashboardProps, type DashboardControlProps } from '@lib/index';
import { useRef } from 'react';
import { Dashboard, DashboardProps, type DashboardControlProps } from '@libs/Dashboard';
import { socketActions, socketSelectors, socketStore } from '@libs/NetworkAndSocket/Socket/store/socket.store';
// import { Preloaders } from '../dist'
// import { Preloaders } from 'rc-lib-ui'
import { Archive } from '@mui/icons-material';
import { Chip } from '@mui/material';

// import { SocketApi } from 'lib-socket-api';
import { Network } from '@libs/NetworkAndSocket/Network';
import { Socket } from '@libs/NetworkAndSocket';

// (window as any).SocketApi = SocketApi;
(window as any).socketSelectors = socketSelectors;
(window as any).socketStore = socketStore;
(window as any).socketActions = socketActions;

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
    to: '/test',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    to: '/test2',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    to: '/test3',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    to: '/test4',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    to: '/test5',
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: 'Архив ddddddddddddddddddddddddddddddddsssssssssssssssssss',
    to: '/test6',
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
      {/* <Socket.Initialization init={{
        url: 'wss://tmk.ivmis.ru/tm/',
        timeReConnect: 5000
      }}/>
      <Socket.ConnectDetection />
      <Socket.ReConnectButton children={(actions) => <span>asdsadassa</span>} />
      <Network.Detection /> */}

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
          isMenu: true
          // isScrollIndentation: true
          //isHeader: false, full off header
        }}
        children={(
          <div className={'content'} style={{ position: 'relative',  }} >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam veniam explicabo, eveniet aliquid enim repellat harum impedit eos voluptatum consequatur non sit id, rerum, voluptatibus quasi natus! Repudiandae, voluptate culpa.
            Mollitia vitae culpa doloribus! Commodi ratione natus iusto itaque cumque, neque modi delectus cupiditate dolorem quasi at tempora quidem rerum numquam consequatur quos aliquam quas eum ullam obcaecati rem blanditiis?
            Sunt at, vero repudiandae ratione perspiciatis, hic explicabo accusamus qui maiores ipsum numquam, natus doloremque odit quas pariatur unde magnam reprehenderit excepturi voluptas eum maxime nulla eius ex! Nobis, doloribus.
            Adipisci sint aliquid corporis consectetur. Vitae modi minima officiis autem tempore vel dolore dolorum dolorem iure earum non, quia voluptates dolor nesciunt nihil ipsa corrupti atque? Error iure tenetur ea!
            Maiores magnam, placeat, ullam et magni nam ipsa voluptates ratione cupiditate dignissimos, porro hic a eligendi autem consequuntur nemo ut quaerat dolor sint? Molestias, incidunt distinctio magni facere magnam soluta!
            <div style={{position: 'relative'}}>

            {/* <Socket.OfflineDetection isNetwork={false} sx={{  }} /> */}
            </div>
          </div>
        )}
        />
     

      {/* <div className={'content'} style={{ position: 'relative', overflow: 'hidden', height: '100%' }} >
        <Socket.OfflineDetection sx={{ position: 'absolute', bottom: 0, right: 0 }} children={({ isDisableConnectSocket }) => isDisableConnectSocket ? 'Режим оффлайн' : 'оффлайн'} />
        <Network.Render />
      </div> */}

    </>
  )
}


