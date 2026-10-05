import { TransitionAnimationsOne } from '@libs/index';
import { Preloaders } from '@libs/Preloaders';
import { Box, Button, type SxProps, type Theme } from '@mui/material';
import React, { FC, ReactNode, useCallback, useState } from "react"
import { SwitchTransition } from 'react-transition-group';


const baseProps: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  flex: 1
};

const defaultSxStateContent: SxProps<Theme> = {
  ...baseProps,
  justifyContent: 'center',
  alignItems: 'center',
}
const defaultSxContent: SxProps<Theme> = {
  ...baseProps,
}



export interface TestingPreloadersProps {
  children?: ReactNode;
}
const test = {
  offline: 'reconnecting',
  reconnecting: 'empty',
  empty: 'offline',
}
const TestingPreloadersMemo: FC<TestingPreloadersProps> = (props) => {
  const [isRenderComponent, setIsRenderComponent] = useState(true);
  const [currentState, setCurrentState] = useState('offline');
  const [isPreloader, setIsPreloader] = useState(true)
  const [isData, setIsData] = useState(false)


  const toggleRenderComponent = () => {
    console.dir(1);
    setIsRenderComponent((prev) => !prev);
  }
  const toggleActivePreloader = () => {
    console.dir(2);
    setIsPreloader((prev) => !prev);
  }
  const toggleStatus = () => {
    console.dir(3);
    const newState = test[currentState];
    setCurrentState(newState);
  }
  const toggleIsData = () => {
    console.dir(4);
    setIsData((prev) => !prev);
  }





  const renderStateContent = useCallback(() => {
    switch (currentState) {
      case 'init':
      case 'connecting':
      case 'ready-loading':
      case 'loading': return null;
      // <Preloaders name='RotateCube' size={40} show={true} timeout={0} variant='spread' sx={sxPreloader} {...otherPreloaderState}/>;
      case 'offline': return <div>offline</div>
      case 'reconnecting': return <div>reconnecting</div>
      // case 'offline-socket': return <OfflineServerCards visual="variant1" reConnect={reConnect} isDisableConnectSocket={isDisableConnectSocket} />;
      case 'empty': return <div>empty</div>;
      default: return ['empty', 'offline-socket'].includes(currentState) ? <div>empty</div> : null;
    }

  }, [currentState]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Button onClick={toggleRenderComponent}>toggle render component</Button>
      <Button onClick={toggleActivePreloader}>toggle preloader</Button>
      <Button onClick={toggleStatus}>toggle is status </Button>
      <Button onClick={toggleIsData}>toggle is data</Button>
      <Box sx={{ flexGrow: 1, position: 'relative', display: 'flex' }}>
        {
          isRenderComponent
            ? (
              <Preloaders
                timeout={300}
                show={isPreloader}
                slotProps={{
                  transition: {
                    // animation: 'slide-left',
                    appear: true
                  },
                  preloader: {
                    name: 'Cube',
                    sx: { backgroundColor: 'info.dark' }
                  }
                }}
              // sx={() => ({ backgroundColor: 'MenuText', zIndex: 1301 })}
              >
                <div className='TestingPreloaders' style={{ height: '100%', display: 'flex' }}>
                  <SwitchTransition mode="out-in">
                    <TransitionAnimationsOne
                      appear={true}
                      sx={Object.assign(isData ? defaultSxContent : defaultSxStateContent)}
                      key={isData ? 'content' : `state-${currentState}`}
                      animation={`fade`}
                      timeout={300}
                      unmountOnExit
                    >
                      {isData ? <div>content</div> : renderStateContent()}
                    </TransitionAnimationsOne>
                  </SwitchTransition>
                </div>
              </Preloaders>
            )
            : null
        }

      </Box>
    </Box>
  )
};

export const TestingPreloaders = React.memo(TestingPreloadersMemo);
