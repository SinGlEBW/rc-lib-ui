import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useMemo, type FC, type ReactNode } from 'react';



import { ScopedCssBaseline } from '@mui/material';
import { commonTheme } from './config/commonTheme';
import { getDarkTheme } from './config/getDarkTheme';
import { getLightTheme } from './config/getLightTheme';
import { grey, indigo } from '@mui/material/colors';



interface MaterialDarkMode {
  children?: ReactNode;
  isDarkTheme?: boolean;
}

const MaterialDarkModeMemo:FC<MaterialDarkMode> = ({ children, isDarkTheme }) => {

  const theme = useMemo(() => {
    const muiThemeFull = createTheme(commonTheme, isDarkTheme ? getDarkTheme(commonTheme) : getLightTheme(commonTheme))
    const html = document.documentElement;
    html.setAttribute('theme', muiThemeFull.palette.mode);
    return muiThemeFull
  }, [isDarkTheme]);


  return (
    <ThemeProvider theme={theme} >
      <ScopedCssBaseline enableColorScheme sx={({ palette, scrollConfig }) => ({
        height: 'inherit',
        '*::-webkit-scrollbar': {
          width: 12,
          height: 0
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: 100,
          background: scrollConfig?.color,
          border: '1px solid rgba(0, 0, 0, 0.1)',
        },
        '@-moz-document url-prefix()': {
          'div': {
            scrollbarColor: `${scrollConfig?.color} !important`,
            // scrollbarWidth: 'thin !important'
          }
        }
      })} >
        {children}
      </ScopedCssBaseline>
    </ThemeProvider>
  );
};

export const MaterialDarkMode = React.memo(MaterialDarkModeMemo);

/*
INFO: Можно передавать свойства переменным css
    const colorScroll = muiThemeFull.palette.mode === 'dark' ? indigo[400] : grey[500];
    const globalStyle = ``
    .concat(`--color-scroll: ${colorScroll};`)
    .concat(`--moz-color-scroll1: ${colorScroll};`)
    .concat(`--moz-color-scroll2: ${ Color.hexBrightness(colorScroll, .4)};`)
    html.setAttribute("style", globalStyle);
  
    но вариант какой-то более мусорный. Лучше использовать 2 отдельных файла mui темы и описать значения там
    в последующем дёргать в файлах используя useTheme
*/