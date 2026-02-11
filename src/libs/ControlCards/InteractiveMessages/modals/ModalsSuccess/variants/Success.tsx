import {
  Celebration,
  CheckCircle,
  TaskAlt,
  VerifiedUser
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import { DialogContainer } from '../../../InteractiveMessage.styled';



// Вариант 2: С иконкой успеха
export const SuccessDialogWithIcon: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}> = ({ open, onClose, title, message }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <CheckCircle
          sx={{
            fontSize: 64,
            color: theme.palette.success.main,
            mb: 2
          }}
        />
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {message}
        </Typography>
        <Button
          onClick={onClose}
          variant="contained"
          color="success"
          size="large"
        >
          Ок
        </Button>
      </Box>
    </Dialog>
  );
};

// Вариант 3: Стильный с градиентом
const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
  color: 'white',
  padding: theme.spacing(3),
  textAlign: 'center'
}));

export const SuccessDialogGradient: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}> = ({ open, onClose, title, message }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <GradientBox>
        <TaskAlt sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">{message}</Typography>
      </GradientBox>
      <DialogContent sx={{ textAlign: 'center', py: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="success"
          size="large"
          sx={{ minWidth: 120 }}
        >
          Ок
        </Button>
      </DialogContent>
    </Dialog>
  );
};


// Вариант 4: Для важных операций +
export const SuccessDialogImportant: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  details?: string;
}> = ({ open, onClose, title, message, details }) => {
  return (
    <DialogContainer sx={{padding: 0}}>
      <DialogTitle sx={{p: 2.5}}>
        <Box display="flex" alignItems="center" gap={1}>
          <VerifiedUser color="success" />
          <span>{title}</span>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent >
        <Typography variant="h6" gutterBottom>
          {message}
        </Typography>
        {details && (
          <Typography variant="body2" color="text.secondary">
            {details}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="success"
          size="large"
          startIcon={<CheckCircle />}
        >
          Понятно
        </Button>
      </DialogActions>
    </DialogContainer>
  );
};


// Вариант 5: Анимированный с праздничным стилем  + 
export const SuccessDialogCelebration: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}> = ({ open, onClose, title, message }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ textAlign: 'center', p: 4, position: 'relative' }}>
        <Celebration
          sx={{
            fontSize: 80,
            color: 'success.main',
            mb: 2,
            animation: 'pulse 0.5s ease-in-out infinite alternate'
          }}
        />
        <Typography variant="h4" gutterBottom color="success.main">
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {message}
        </Typography>
        <Button
          onClick={onClose}
          variant="contained"
          color="success"
          size="large"
          sx={{
            minWidth: 140,
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          Отлично!
        </Button>
      </Box>
    </Dialog>
  );
};


// Пример использования
const ExampleUsage: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Показать успешный диалог
      </Button>

      <SuccessDialogWithIcon
        open={open}
        onClose={() => setOpen(false)}
        title="Операция выполнена!"
        message="Данные успешно сохранены в системе."
      />
    </>
  );
};

export default ExampleUsage;