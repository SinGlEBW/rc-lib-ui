import type { CSSObject } from '@mui/material';

const correctNumberToPx = (value: any) => typeof value === 'number' ? value + 'px' : value;
export const convertWidthToLeftPM = (
  minWidthMenuColumn:  Pick<CSSObject, 'width'>,
  config: { newProp?: 'marginLeft' | 'paddingLeft' | 'width', positionCorrect?: string} = {}) => {
  const { newProp = 'marginLeft', positionCorrect = '- 0px' } = config;
  let payload: any = {}
  for (const [key, value] of Object.entries(minWidthMenuColumn)) {
    if (typeof value === 'object' && 'width' in value) {
      const correctValue = correctNumberToPx(value?.width);
      
      payload[key] = { [newProp]: `calc(${correctValue} ${positionCorrect})` };
    } else {
      const correctValue = correctNumberToPx(value);
      payload[newProp] = `calc(${correctValue} ${positionCorrect})`;
    }
  }
 
  return payload
}