import React, { forwardRef, useEffect, useState, type FC } from 'react';
import { Save as SaveIcon } from '@mui/icons-material';
import { Box, Button, Card, LinearProgress, Typography } from '@mui/material';
import { Color } from 'dev-classes';
import { StyledCoundChip } from '@libs/common/StyledCoundChip';


interface NotificationDeleteSelectionProps {
  text: string;
  time: number;
  onUndo: () => void;
  progress?: number;
}


const NotificationDeleteSelectionMemo:FC<NotificationDeleteSelectionProps> = ({
  text,
  onUndo,
  progress,
  time
}) => {

  return (
    <Card
      sx={{
        py: 1,
        px: 1.5,
        mx: 1.5,
        boxShadow: 3,
        borderRadius: 2,
width: '100%'
     
      }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>

        <Typography
          sx={{ m: 0, mr: 1 }}
          variant="body1" gutterBottom>
          {text}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledCoundChip children={time} />
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={onUndo}
          >
            Отмена
          </Button>
        </Box>
      </Box>
      <Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={(theme) => ({
            mt: 1,
            height: 4,
            backgroundColor: Color.hexBrightness(theme.palette.primary?.light, 1.5),
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'profile1.main'
            }
          })}
        />
      </Box>

    </Card>

  );
}



export const NotificationDeleteSelection = React.memo(NotificationDeleteSelectionMemo);