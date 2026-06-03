import React, { FC, ReactNode, useState } from "react"
import { Network } from '@libs/NetworkAndSocket/Network';
import { Box, Button } from '@mui/material';

export interface TestingNetworkProps {
  children?: ReactNode;
}

const TestingNetworkMemo: FC<TestingNetworkProps> = (props) => {
  const [state, setState] = useState({isNetwork: true});
  const offline = (params) => {
    setState((prev) => ({ ...prev, isNetwork: false }));
  }
  const online = (params) => {
    setState((prev) => ({ ...prev, isNetwork: true }));
  }
  return (
    <Box className='TestingNetwork' sx={{ height: '100px', mt: 2, width: '100%', border: '1px solid black' }} >
      <p>TestingNetwork</p>
      <Button onClick={online}>Online</Button><Button onClick={offline}>Offline</Button>
      <Network.Render isNetwork={state.isNetwork} slotProps={{online: {sx: {backgroundColor: 'success.dark'}}}}/>
    </Box>
  )
};

export const TestingNetwork = React.memo(TestingNetworkMemo);
