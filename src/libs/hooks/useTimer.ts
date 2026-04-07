import React, { useCallback, useEffect, useRef, useState } from "react";

import { Timer } from "dev-classes";
import { setStateDecorator } from '@libs/_helpers';

interface UseTimerProps {
  timer?: number;
  defaultIsActive?: boolean;
  onDeActive?: () => void;
  isDefaultPause?: boolean
}

interface UseTimerState {
  isActive: boolean;
}

export const useTimer = ({defaultIsActive = true, timer = 5000, onDeActive, isDefaultPause = false}: UseTimerProps) => {
  const [state, setState] = useState<UseTimerState>({
    isActive: defaultIsActive,
  });
  const setStateHelpers = setStateDecorator<typeof state>(state, setState);

  const timerRef = useRef<Timer | null>(null);

  // Инициализация таймера
  useEffect(() => {
    timerRef.current = new Timer(timer!, () => {
      onDeActive && onDeActive();
      setStateHelpers({ isActive: false });
    });

    // Автоматически запускаем таймер при монтировании
    if(defaultIsActive){
      timerRef.current.startTime();
    }
    if(isDefaultPause){
      timerRef.current.pauseTime();
    }
    // Очистка при размонтировании
    return () => {
      if (timerRef.current) {
        // Сбрасываем таймер, чтобы предотвратить вызов колбэка после размонтирования
        timerRef.current.resetTime();
      }
    };
  }, [timer]);

  // Показать панель и запустить таймер
  const handleActive = useCallback(() => {
    if (!state.isActive) {
      setStateHelpers({ isActive: true });
      
      // Важно: сбрасываем и запускаем таймер заново
      if (timerRef.current) {
        timerRef.current.resetTime();
        timerRef.current.startTime();
      }
    }
  }, [state.isActive]);

  // Сбросить время (продлить показ панели)
  const handleReset = useCallback(() => {
    if (timerRef.current && state.isActive) {
      timerRef.current.resetTime();
      timerRef.current.startTime();
    }
  }, [state.isActive]);

  // Поставить на паузу (например, при открытии select)
  const handlePause = useCallback(() => {
    if (timerRef.current && state.isActive) {
      timerRef.current.pauseTime();
    }
  }, [state.isActive]);

  // Возобновить таймер (например, при закрытии select)
  const handleResume = useCallback(() => {
    if (timerRef.current && state.isActive) {
      timerRef.current.resumeTime();
    }
  }, [state.isActive]);

  // Скрыть панель принудительно
  const handleDeActive = useCallback(() => {
    setStateHelpers({ isActive: false });
    if (timerRef.current) {
      timerRef.current.resetTime();
    }
  }, []);

  return {
    isActive: state.isActive,
    handleActive,
    handleReset,
    handlePause,
    handleResume,
    handleDeActive,
  };
};