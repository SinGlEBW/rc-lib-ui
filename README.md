<h1 align="center">rc-ui-lib</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/rc-lib-ui">
    <img src="https://img.shields.io/npm/v/rc-lib-ui?label=Latest%20Release&logo=npm&style=flat-square" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/rc-lib-ui">
    <img src="https://img.shields.io/npm/dm/rc-lib-ui?label=Downloads&logo=npm&style=flat-square" alt="npm downloads" />
  </a>
  <a href="https://github.com/SinGlEBW/rc-lib-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/rc-lib-ui?label=License&style=flat-square" alt="license" />
  </a>
  <a href="https://github.com/SinGlEBW/rc-lib-ui">
    <img src="https://img.shields.io/github/last-commit/SinGlEBW/rc-lib-ui?label=Last%20Commit&style=flat-square" alt="last commit" />
  </a>
</p>


<h3 align="center">Preloaders</h3>

```tsx
import { Preloaders } from "rc-lib-ui/preloaders";

export const App = () => {
  //SpinnerGrow | SpinnerBorder | Spinner3D | Ball | Time | Cube | RotateCube

  return (
    <Box sx={{ flexGrow: 1, position: "relative", display: "flex" }}>
      <Preloaders
        timeout={300}
        show={isPreloader}
        slotProps={{
          transition: {
            animation: "fade",
            // appear: true // Если нужна анимация при монтировании компонента
          },
          preloader: {
            name: "RotateCube",
            sx: {
              backgroundColor: "info.dark",
            },
          },
        }}
        //События анимации
      >
        <div className="content" style={{ height: "100%" }}>
          Контент
        </div>
      </Preloaders>
    </Box>
  );
};
```

---

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
  itemsProps={{ MuiHeader: { AfterComponent: <OfflineDetection /> } }}
  children={/*...*/}
/>
```

```tsx
// My Header. variant control by ref
export const App = () => {
  const dashboardControlRef = useRef<DashboardControlProps>(null);
  const handleMenuToggle = () => {
    dashboardControlRef.current?.handleMenuToggle();
  };

  return (
    <>
      <Dashboard
        ref={dashboardControlRef}
        styleList="variant2"
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
          isButtonCenterMenu: false,
          //isHeader: false, full off header
        }}
        Footer={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>Footer</div>}
        children={/*...*/}
      />
    </>
  );
};
```

---

<h3 align="center">Socket Components</h3>

```tsx
import { Socket, SocketApi, BasePayloadSocket } from "rc-lib-ui/socket";

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
<Socket.Buttons.OfflineActive chidlren={({offlineActive}) => <Button onClick={offlineActive}/> } />,
<Socket.Buttons.ReConnect chidlren={({reConnect}) => <Button onClick={reConnect}/> } />,




//Запросы
const options = { timeout: 5000 }
const payload = {
  action: 'actionExample1'//требуется для того что бы получать ответ в then
  //далее что угодно
}
//Можно обработать локально
const result = await SocketApi.request<MyResponseTypes<any>, BasePayloadSocket>(payload, options)//result: { request, response }

//Или получить ответ на глобальном уровне
//Пример использования события
export const InitSocketEvents = createThunk(() => (dispatch, getState) => {
  SocketApi.on('msg',  ({ response: socketMessage }) => {

    if ((socketMessage as any).type === 3) {
      dispatch(resetStoreApp());
      SocketApi.disconnect();
      return;
    }

    if (socketMessage.action === APP.OPEN) {
      dispatch(fetchingApp.connect());
      dispatch(fetchingApp.online({ isOnline: true }));
      dispatch(fetchingApp.sendDeviceUID());
    } else {

      if (socketMessage.type === 2 && socketMessage.action) {
        dispatch(errorsActions.setError({ keyAction: socketMessage.action, msg: socketMessage.mess }));
        return;
      }

      ArrIncludesCalling.includes(socketMessage.action) && dispatch(watchVideoCall(socketMessage));
      ArrIncludesDialogs.includes(socketMessage.action) && dispatch(watchDialogs(socketMessage));
    }
  });
});
```

---

<h3 align="center">Control Cards</h3>

```tsx
import { InteractiveMessageProvider, useInteractiveMessage } from "rc-lib-ui/control-cards";

<InteractiveMessageProvider CustomAlerts={customAlerts} CustomModals={customModals}>
  <App />
</InteractiveMessageProvider>;

//в App
const { showAlert, showModal, removeMessage, ...props } = useInteractiveMessage();

const handleShowAlert = (params) => {
  showAlert({
    message: "Какое-то сообщение",
    key: "key1",
    variant: "info",
    onExited: () => {},
    //всякие доп настройки алерта
  });
};
```
