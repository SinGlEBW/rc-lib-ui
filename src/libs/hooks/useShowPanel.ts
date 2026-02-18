import React, { useCallback, useEffect, useRef, useState } from "react";

import { Timer } from "dev-classes";
import { setStateDecorator } from '@libs/_helpers';

interface UseShowPanelProps {
  timerShowPanel?: number;
}

interface UseShowPanelState {
  showPanel: boolean;
}

export const useShowPanel = (props: UseShowPanelProps = { timerShowPanel: 5000 }) => {
  const [state, setState] = useState<UseShowPanelState>({
    showPanel: true,
  });
  const setStateHelpers = setStateDecorator<typeof state>(state, setState);

  const timerRef = useRef<Timer | null>(null);

  // Инициализация таймера
  useEffect(() => {
    timerRef.current = new Timer(props.timerShowPanel!, () => {
      console.log("Время истекло, скрываем панель");
      setStateHelpers({ showPanel: false });
    });

    // Автоматически запускаем таймер при монтировании
    timerRef.current.startTime();

    // Очистка при размонтировании
    return () => {
      if (timerRef.current) {
        // Сбрасываем таймер, чтобы предотвратить вызов колбэка после размонтирования
        timerRef.current.resetTime();
      }
    };
  }, [props.timerShowPanel]);

  // Показать панель и запустить таймер
  const handleShowPanel = useCallback(() => {
    if (!state.showPanel) {
      setStateHelpers({ showPanel: true });
      
      // Важно: сбрасываем и запускаем таймер заново
      if (timerRef.current) {
        timerRef.current.resetTime();
        timerRef.current.startTime();
      }
    }
  }, [state.showPanel]);

  // Сбросить время (продлить показ панели)
  const handleResetTimePanel = useCallback(() => {
    if (timerRef.current && state.showPanel) {
      timerRef.current.resetTime();
      timerRef.current.startTime();
    }
  }, [state.showPanel]);

  // Поставить на паузу (например, при открытии select)
  const handlePauseTimer = useCallback(() => {
    if (timerRef.current && state.showPanel) {
      timerRef.current.pauseTime();
    }
  }, [state.showPanel]);

  // Возобновить таймер (например, при закрытии select)
  const handleResumeTimer = useCallback(() => {
    if (timerRef.current && state.showPanel) {
      timerRef.current.startTime();
    }
  }, [state.showPanel]);

  // Скрыть панель принудительно
  const handleHidePanel = useCallback(() => {
    setStateHelpers({ showPanel: false });
    if (timerRef.current) {
      timerRef.current.resetTime();
    }
  }, []);

  return {
    showPanel: state.showPanel,
    handleShowPanel,
    handleResetTimePanel,
    handlePauseTimer,
    handleResumeTimer,
    handleHidePanel,
  };
};