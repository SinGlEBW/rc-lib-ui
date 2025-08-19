
import React from 'react';
import { ConnectDetection, SocketConnectDetectionProps } from './components/ConnectDetection/ConnectDetection';
import { OfflineDetection, SocketOfflineDetectionPayloadProps, SocketOfflineDetectionProps } from './components/OfflineDetection/OfflineDetection';
import { ReConnectButton, ButtonActionsProps, ReConnectButtonProps } from './components/ReConnectButton/ReConnectButton';
import { InitializationSocket, InitializationSocketProps } from './InitializationSocket';

const Socket = () => <></>;

Socket.ConnectDetection = ConnectDetection;
Socket.OfflineDetection = OfflineDetection;
Socket.ReConnectButton = ReConnectButton;
Socket.Initialization = InitializationSocket;



export { 
  Socket,
  type SocketConnectDetectionProps,
  type SocketOfflineDetectionPayloadProps,
  type SocketOfflineDetectionProps,
  type ButtonActionsProps,
  type ReConnectButtonProps,
  type InitializationSocketProps
};

