
import React from 'react';
import { ConnectDetection, SocketConnectDetectionProps } from './ConnectDetection/ConnectDetection';
import { Initialization, InitializationSocketProps } from './Initialization/Initialization';
import { OfflineDetection, SocketOfflineDetectionPayloadProps, SocketOfflineDetectionProps } from './OfflineDetection/OfflineDetection';
import { ReConnect, ReConnectButtonProps } from './Buttons/ReConnect';
import { OfflineButton, OfflineButtonProps } from './Buttons/OfflineButton';



export const Socket = {
  ConnectDetection,
  OfflineDetection,
  Buttons: {
    OfflineActive: OfflineButton,
    ReConnect
  },
  Initialization
}

export {
  type InitializationSocketProps, 
  type SocketConnectDetectionProps,
  type SocketOfflineDetectionPayloadProps,
  type SocketOfflineDetectionProps
};

