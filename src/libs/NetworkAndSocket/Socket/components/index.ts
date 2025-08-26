
import React from 'react';
import { ConnectDetection, SocketConnectDetectionProps } from './ConnectDetection/ConnectDetection';
import { Initialization, InitializationSocketProps } from './Initialization/Initialization';
import { OfflineDetection, SocketOfflineDetectionPayloadProps, SocketOfflineDetectionProps } from './OfflineDetection/OfflineDetection';
import { ButtonActionsProps, ReConnectButton, ReConnectButtonProps } from './ReConnectButton/ReConnectButton';



export const Socket = {
  ConnectDetection,
  OfflineDetection,
  ReConnectButton,
  Initialization
}

export {
  // type ButtonActionsProps, 
  type InitializationSocketProps, 
  // type ReConnectButtonProps, 
  type SocketConnectDetectionProps,
  type SocketOfflineDetectionPayloadProps,
  type SocketOfflineDetectionProps
};

