<h1 align="center">rc-ui-lib</h1>


<h3 align="center">Preloaders</h3>

```tsx
import { Preloaders } from "rc-lib-ui/preloaders";

export const App = () => {
  //SpinnerGrow | SpinnerBorder | Spinner3D | Ball | Time | Cube | RotateCube

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Preloaders name="Ball" show={true}>
        <div className="content"></div>
      </Preloaders>
    </div>
  );
};
```



___
<h3 align="center">Dashboard</h3>

```tsx
import { Dashboard } from "rc-lib-ui/dashboard";

const listMen = [
  {
    icon: <Archive sx={{ width: 25 }} />,
    title: "Archive loooooooooooooooooooooooooooong text",
    path: "/test",
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    icon: <ListSharp />,
    title: "Lists",
    action: popoverMenuAction,
    children: [
      { title: "List 1", path: "/listOne" },
      { title: "List 2", path: "/listTwo", icon: <StarBorder /> },
    ],
  },
] as DashboardProps["listMenu"];


export const App = () => {
  return (
    <Dashboard
      listMenu={listMenu}
      children={
        <div className={"content"} style={{ position: "relative" }}>
          Content
        </div>
      }
    />
  );
};
```
```tsx
/*
  //default
  statuses={{ isHeader: true, isHeaderResize: true, isMenuHeader: true }}

  Example variants
  variant 1:  statuses={{ isHeaderResize: false }}
  variant 2:  statuses={{ isHeader: false, isMenuHeader: false }}

  Extends variant
  statuses={{
    ...,
    isDefaultOpen: true,
    isButtonCenterMenu: false, //you can disable the menu control button at manage via.
                               //If you want to manage manually, use the methods via ref|| or if you want to completely replace the header using HeaderContent
  }}

*/

<Dashboard
  listMenu={listMenu}
  HeaderContent={(config) => (
    <>
      <Toolbar>
        <IconButton onClick={config.handleMenuToggle} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} children={<MenuIcon />} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} children={"App"} />
      </Toolbar>
    </>
  )}
 itemsProps={{MuiHeader: {AfterComponent: <OfflineDetection/>}}}
  children={/*...*/}
/>;

```
```tsx
// My Header. variant control by ref
export const App = () => {

  const dashboardControlRef = useRef<DashboardControlProps>(null)
  const handleMenuToggle = () => { dashboardControlRef.current?.handleMenuToggle() }

  return (
    <>
      <Dashboard
        ref={dashboardControlRef}
        styleList='variant2'
        listMenu={listMenu}

        columnMenu={{
          initWidth: 280,
          minWidthColumn: {
            width: 80, // variant1 - min 40,  variant2 - min 53,
          },
          position: "right",
        }}
        HeaderContent={
          <header style={{ position: "fixed", zIndex: 1, width: "100%", backgroundColor: "#456789" }}>
            <Toolbar>
              <IconButton onClick={handleMenuToggle} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} children={<MenuIcon />} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} children={"App"} />
            </Toolbar>
          </header>
        }
        statuses={{
          isHeaderDefault: false,
          isButtonCenterMenu: false
          //isHeader: false, full off header
        }}
        Footer={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            Footer
          </div>
        }
        children={/*...*/}
      />
    </>
  )
}
```

___

<h3 align="center">Socket Components</h3>


```tsx
import { Socket } from "rc-lib-ui/socket";

<Socket.Initialization
    onMount={() => {
      dispatch(InitSocketEvents())
    }}
    isNetwork={!!isNetwork}
    typeNetwork={typeNetwork}
    init={{
      url: process.env.REACT_APP_URL_WS as string,
      timeReConnect: 10000,
      isReConnectNetworkOnline: true,
   
    }}
  />

// Отображение состояния сокета
  <Socket.ConnectDetection/> 
  <Socket.OfflineDetection 
    isNetwork={!!isNetwork}
    children={({isDisableConnectSocket}) => {
      const titleOffline = 'Оффлайн';
      return isDisableConnectSocket ? `Режим ${titleOffline}` : titleOffline
    }}
    />
  //Воздействие на сокет
  <Socket.ReConnectButton/>,
 
```