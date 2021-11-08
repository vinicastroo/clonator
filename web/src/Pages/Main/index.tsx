/* eslint-disable camelcase */
/* eslint-disable react/style-prop-object */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Container from '@mui/material/Container';

import { Form } from '@unform/web';
import { TextField } from 'unform-material-ui';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import api from '../../services/api';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Main() {
  interface CreateResourceFormData {
    description: string;
    anwser: string;
    id?: string;
  }
  interface QuestionData {
    description: string;
    anwser: string;
    next_question_id?: string;
    next_question: QuestionData;
  }

  interface CreateResourceFormData {
    description: string;
    anwser: string;
    next_question_id: string;
  }
  interface MessageProps {
    open: boolean;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
  }

  const [questions, setQuestions] = useState<QuestionData[]>();
  const [selectQuestion, setSelectQuestion] = useState<QuestionData>();
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState<MessageProps>({
    open: false,
    message: '',
    type: 'success',
  });

  const handleClose = () => {
    setOpen(false);
  };

  const loadQuestions = useCallback(async () => {
    await api.get('/findFirst').then(response => {
      setQuestions([response.data]);

      console.log(response);

      if (response.data.length === 0) {
        setOpen(true);
      }
    });
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleSubmit = useCallback(async (data: CreateResourceFormData) => {
    try {
      await api.post(`/`, {
        ...data,
      });

      setOpen(false);
      setMessage({
        open: true,
        message: 'Questão criada com sucesso!',
        type: 'success',
      });
    } catch (err: any) {
      setMessage({
        open: true,
        message: 'Aconteceu um erro ao criar a questão',
        type: 'error',
      });
    }
  }, []);

  const handleClickOption = useCallback(
    async (id?: string) => {
      if (id) {
        await api.get(`/${id}`).then(response => {
          if (questions && questions.length > 0) {
            setQuestions([...questions, response.data]);
          }
        });
      } else {
        setOpen(true);
      }
    },
    [questions],
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" component="div">
              Akinator
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 6 }}>
        {questions &&
          questions.map(question => (
            <Card variant="outlined" sx={{ maxWidth: 345, p: 2 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  {question.description}
                </Typography>
              </CardContent>

              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={() => handleClickOption(question.next_question_id)}
                >
                  Não
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleClickOption(question.next_question_id)}
                >
                  Sim
                </Button>
              </CardActions>
            </Card>
          ))}
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Form onSubmit={handleSubmit}>
          <DialogTitle sx={{ p: 2 }}>Criação de Questão</DialogTitle>
          <DialogContent sx={{ p: 2 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="answer"
              label="No que voce pensou ?"
              name="answer"
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Elabore um questão"
              name="description"
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit">Enviar</Button>
          </DialogActions>
        </Form>
      </Dialog>

      <Snackbar
        open={message.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={() =>
            setMessage({ open: false, message: '', type: 'success' })
          }
          severity={message.type}
          sx={{ width: '100%' }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </>
  );
}
