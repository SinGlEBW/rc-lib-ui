<h1 align="center">rc-lib-ui</h1>

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
  //прелодер в котором существует либо прелодер либо контент
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

//или если требуется использовть ref контента и нужен прелодер поверх контента
return (
  <Box sx={{ flexGrow: 1, position: "relative", display: "flex", flexDirection: "column" }}>
    <Preloaders.PreloaderComponent
      show={isPreloader}
      slotProps={{
        transition: {
          animation: "slide-left",
        },
        preloader: {
          name: "SpinnerGrow",
          sx: {
            backgroundColor: "info.dark",
          },
        },
      }}
    />
    {content}
  </Box>;
  )
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
    // typeNetwork={typeNetwork}
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

##### Вариант удаления без предаврительной плашки с временем

```tsx
const { showModalDelete, handleSelect, checkSelected, checkIsReadyDelete } = useControlCards({
  keyAction: "delete-clients",
  list: socketLoadClients.data,
  isDurationDelete: false,
  onComfirm: (items, controlHelper) => {
    const { id } = items[0];
    console.dir(id);
    const { id } = items[0];
    dispatch(fetchingDelete.requestDelClient({ id })).then((res) => {
      debugger;
      controlHelper.showAlert({
        variant: "success",
        message: "Успешное удаление",
        timeout: 2000,
        // onExited: () => {}//вариант удаления тут
      });
      controlHelper.deletingPackID({ delPackID: controlHelper.delPackID });
      dispatch(clientsAction.delete({ id }));
    });
  },
  onCancel() {},
});

const handleStartDelete = useCallback(
  ({ id, ...otherData }) => {
    handleSelect(id);
    showModalDelete();
  },
  [handleSelect, showModalDelete],
);

const itemContent = useCallback(
  ({ id, snils, fio }) => {
    const isReadyDelete = checkIsReadyDelete(id);
    const isSelected = checkSelected(id);

    return (
      <Box sx={{ my: 0.8 }}>
        <ContentPage.Container>
          <CardTimelineWithClose
            className={cn("timeline-card-custom bg-info m-0", {
              "anim-skeleton": isReadyDelete,
              // 'card--selected': isSelected, // если нужно красить
            })}
            hiddenBtnDell={statusConnectSocket !== "ready" || isReadyDelete}
            onCard={() => !isReadyDelete && handleClickClient({ client_id: id, fio, snils })}
            onDelete={() => handleStartDelete({ id, snils, fio })}
          >
            <p className="card__title mb-0 fw-500" style={{ fontSize: 15 }}>
              {fio}
            </p>
            <small>{snils}</small>
          </CardTimelineWithClose>
        </ContentPage.Container>
      </Box>
    );
  },
  [checkIsReadyDelete, checkSelected, statusConnectSocket, handleClickClient, handleStartDelete],
);
```

##### Вариант удаления c предаврительной плашки с временем

```tsx
import { CardDetectionPress, animationDelete, useControlCards } from 'rc-lib-ui/control-cards';

//...

const { showModalDelete, handleSelect, checkSelected, selectionMode, checkIsReadyDelete, selectedIds, clearSelection } = useControlCards({
    keyAction: USER_CLIENTS.LOAD_CLIENTS_BY_USER,
    list: socketLoadClients.data,
    isDurationDelete: true,
    durationDelete: 5000,
    setMessageProgress(items) {
      return `Удаление ${items.length === 1 ? 'записи' : 'записей'}`
    },
    onEndTimeoutDuration: (items, controlHelper) => {
      dispatch(fetchingContacts.deleteContacts({ ids: items.map((item) => item.id) }))
    }
  })

 const handleCardClick = (_, contact: (typeof contacts)[number]) => {
    if (!selectionMode) {
      // navigate(path)
    } else {
      handleSelect?.(contact.id);
    }
  };



  const handleLongPress = (event: React.MouseEvent | React.TouchEvent, contact: (typeof contacts)[number]) => {
    handleSelect?.(contact.id);
  };
  //если требуеться закрывать 
  const onClose = () => {
    clearSelection()
  }

  return (
      <TransitionGroup component={null}>
        {filteredContacts.map((contact, index) => {
          const isReadyDelete = checkIsReadyDelete(contact.id);
          const isSelected = checkSelected(contact.id);

          return (
            <Collapse
              key={contact.id}
              in={true}
              timeout={300}
            >
              <CardDetectionPress
                id={contact.id}
                // handleSelect={handleSelect}
                selected={isSelected && !isReadyDelete}
                selectMode={false}
                onLongPress={
                  isReadyDelete
                    ? () => { }
                    : (event) => handleLongPress(event, contact)
                }
                onClick={
                  isReadyDelete
                    ? () => { }
                    : (event) => handleCardClick(event, contact)
                }
              >
                <CardsWithAvatars contact={contact} isChecked={isSelected}
                  isOnlineHide={false}
                  sx={(theme) => animationDelete.getBacgroundStripe({ isDeleting: isReadyDelete, })}
                />
              </CardDetectionPress>
            </Collapse>

          )
        })}
      </TransitionGroup>
  )

```
##### Кастомизация плашки с временем

```tsx
import React, { FC, forwardRef, ReactNode, useCallback, useEffect, useState } from "react"
import { useSnackbar, type CustomSnackbarProps, SnackbarContent, DeleteCountdownAlertProps } from 'rc-lib-ui/control-cards';

export type DeleteCountdownProps = CustomSnackbarProps & DeleteCountdownAlertProps & { }

const DeleteCountdownMemo = forwardRef<HTMLDivElement, DeleteCountdownProps>((props, ref) => {
    const { message, duration = 10000, onUndo, onExpire, id, anchorOrigin, className  } = props;

    const [time, setTime] = useState(duration / 1000);
    const { closeSnackbar } = useSnackbar();

    const handleOnExpire = useCallback(() => {
      onExpire && onExpire();
      closeSnackbar(id)
    }, [onExpire, closeSnackbar, id]);


    useEffect(() => {
      if (time <= 0) { handleOnExpire(); return };
      const interval = setInterval(() => {
        setTime(prev => {
          const newValue = prev - 1;
          if (newValue <= 0) {
            clearInterval(interval)
          };
          return newValue;
        });

      }, 1000);

      return () => clearInterval(interval);
    }, [handleOnExpire, time]);

    const handleUndo = () => {
      onUndo && onUndo();
      closeSnackbar(id)
    }


    const progress = (time / Math.ceil(duration / 1000)) * 100;
    const style = {
      ...(anchorOrigin?.horizontal === 'center' && { justifyContent: 'center' }),
      ...props.style || {},
    }

    return (
      <SnackbarContent ref={ref} role="alert" style={style} className={className} >
        <MyNotificationDeleteComponent
          time={time}
          progress={progress}
          text={message as string}
          onUndo={handleUndo}
        />
      </SnackbarContent>
    )
})


export const DeleteCountdown = React.memo(DeleteCountdownMemo);

//В своих кастомных алертах добавляем deleteCountdown
declare module 'notistack' {
  interface VariantOverrides {
    //...
    // Добавляем deleteCountdown к стандартным вариантам
    deleteCountdown: any;
  }
}


export const customAlerts = {
  //...
  deleteCountdown: DeleteCountdown
}

//В main.tsx в провайдере доабвляем

<InteractiveMessageProvider CustomAlerts={customAlerts} CustomModals={customModals}>
  {children}
</InteractiveMessageProvider>

```