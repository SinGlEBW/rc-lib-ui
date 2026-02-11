import { useRef, useCallback } from "react";

export interface UseLongPressOptions {
  onLongPress: (event: React.MouseEvent | React.TouchEvent) => void;
  onClick?: (event: React.MouseEvent | React.TouchEvent) => void;
  delay?: number;
  preventDefault?: boolean;
  scrollThreshold?: number;
}

export const useLongPress = ({
  onLongPress,
  onClick,
  delay = 500,
  preventDefault = true,
  scrollThreshold = 8, //чувствительность отрабатывания
}: UseLongPressOptions) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isLongPressTriggered = useRef(false);
  const isScrolling = useRef(false);
  const startCoords = useRef({ x: 0, y: 0 });

  const checkTouch = useCallback((event?: React.MouseEvent | React.TouchEvent) => {
    //Если нажат был touch, то не нужно что бы мышь отрабатывала
    if (event && preventDefault && event.cancelable) {
      event.preventDefault();
    }
  }, []);

  const start = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      checkTouch(event);
      isLongPressTriggered.current = false;
      isScrolling.current = false;

      // Сохраняем начальные координаты для детекции скрола
      if ("touches" in event) {
        startCoords.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      } else {
        startCoords.current = {
          x: event.clientX,
          y: event.clientY,
        };
      }

      timeoutRef.current = setTimeout(() => {
        if (!isScrolling.current) {
          isLongPressTriggered.current = true;
          onLongPress(event);
        }
      }, delay);
    },
    [checkTouch, delay, onLongPress]
  );

  
  const handleMove = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (isScrolling.current || !timeoutRef.current) return;

      let currentX: number, currentY: number;

      if ("touches" in event) {
        currentX = event.touches[0].clientX;
        currentY = event.touches[0].clientY;
      } else {
        currentX = event.clientX;
        currentY = event.clientY;
      }

      // Проверяем превышение порога скрола
      const deltaX = Math.abs(currentX - startCoords.current.x);
      const deltaY = Math.abs(currentY - startCoords.current.y);

      if (deltaX > scrollThreshold || deltaY > scrollThreshold) {
        isScrolling.current = true;
        clearTimeout(timeoutRef.current);
      }
    },
    [scrollThreshold]
  );

  const clear = useCallback(
    (event?: React.MouseEvent | React.TouchEvent) => {
      checkTouch(event);
      clearTimeout(timeoutRef.current);

      if (event && ["mouseup", "touchend"].includes(event.type.toLowerCase()) && onClick && !isLongPressTriggered.current && !isScrolling.current) {
        onClick(event);
      }

      isLongPressTriggered.current = false;
      isScrolling.current = false;
    },
    [checkTouch, onClick]
  );

  return {
    handlers: {
      onMouseDown: start,
      onTouchStart: start,
      onMouseUp: clear,
      onMouseLeave: clear,
      onTouchEnd: clear,
      onTouchCancel: clear,
      onTouchMove: handleMove,
      onMouseMove: handleMove,
    },
  };
};
