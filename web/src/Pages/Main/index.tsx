/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable react/style-prop-object */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect } from 'react';
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
    answer: string;
    id?: string;
  }
  interface QuestionData {
    id: string;
    description: string;
    answer: string;
    next_question_yes_id?: string;
    next_question_no_id?: string;
    next_question_yes: QuestionData;
    next_question_no: QuestionData;
    typeParms: 'YES' | 'NO' | null;
    active: boolean;
  }

  interface CreateResourceFormData {
    description: string;
    answer: string;
    next_question_id: string;
  }
  interface MessageProps {
    open: boolean;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
  }

  interface ParamsPros {
    question: QuestionData;
    typeParms: 'YES' | 'NO' | null;
  }

  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [selectQuestion, setSelectQuestion] = useState<QuestionData | null>(
    null,
  );

  const [open, setOpen] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);

  const [typeQuestion, setTypeQuestion] = useState<'YES' | 'NO' | null>(null);

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
      if (!response.data) {
        setOpen(true);
        return;
      }

      setQuestions([{ ...response.data, active: true }]);
    });
  }, []);

  const handleSubmit = useCallback(
    async (data: CreateResourceFormData) => {
      try {
        await api.post(`/`, {
          ...data,
          typeQuestion,
          id: selectQuestion?.id,
        });

        setOpen(false);
        setOpenAnswer(false);
        setOpenFinish(false);
        setSelectQuestion(null);

        setMessage({
          open: true,
          message: 'Questão criada com sucesso!',
          type: 'success',
        });

        loadQuestions();
      } catch (err: any) {
        setMessage({
          open: true,
          message: 'Aconteceu um erro ao criar a questão',
          type: 'error',
        });
      }
    },
    [selectQuestion, typeQuestion, loadQuestions],
  );

  const loadQuestionById = useCallback(
    async ({ question, typeParms }: ParamsPros) => {
      await api.get(`/findById/${question?.id}`).then(response => {
        if (!response.data) {
          setOpen(true);
          return;
        }

        const formatedQuestions = questions.map(questionMap => { return { ...questionMap, active: false } });

        setQuestions([...formatedQuestions, { ...response.data, typeParms, active: true }]);
      });
    },
    [questions],
  );

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleClickOption = useCallback(
    async ({ question, typeParms }: ParamsPros) => {
      setTypeQuestion(typeParms);
      setSelectQuestion(question);

      if (typeParms === 'YES' && question.next_question_yes_id) {
        console.log(question)
        loadQuestionById({ question: question.next_question_yes, typeParms });
      } else if (typeParms === 'NO' && question.next_question_no_id) {
        console.log(question)
        loadQuestionById({ question: question.next_question_no, typeParms });
      } else {
        setOpen(true);
      }
    },
    [loadQuestionById],
  );

  useEffect(() => { console.log(questions) }, [questions])

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
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} >
              <Card
                key={question.id}
                variant="outlined"
                sx={{
                  maxWidth: 345,
                  p: 2,
                  mt: 2,
                  gridColumn: `${question.typeParms === 'YES'
                    ? '3'
                    : question.typeParms === 'NO'
                      ? '1'
                      : '2'
                    }`,
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary">
                    {question.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    disabled={!question.active}
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      handleClickOption({ question, typeParms: 'NO' });
                    }}
                  >
                    Não
                  </Button>
                  <Button
                    disabled={!question.active}
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      setSelectQuestion(question);
                      setOpenAnswer(true);
                    }}
                  >
                    Sim
                  </Button>
                </CardActions>
              </Card>
            </Box>
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

      {selectQuestion && (
        <Dialog open={openAnswer} onClose={() => setOpenAnswer(false)}>
          <DialogContent sx={{ p: 2, px: 6 }}>
            <Typography variant="h6" color="text.secondary">
              {`${selectQuestion?.answer} ?`}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => {
                setOpenAnswer(false);
                handleClickOption({
                  question: selectQuestion,
                  typeParms: 'YES',
                });
              }}
            >
              Não
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setOpenFinish(true);
                setOpen(false);
                setOpenAnswer(false);
              }}
            >
              Sim
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog open={openFinish} onClose={() => setOpenFinish(false)}>
        <DialogContent sx={{ p: 2, px: 6 }}>
          <Typography variant="h6" color="text.secondary">
            FIM DE JOGO
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              loadQuestions();
              setOpenFinish(false);
            }}
          >
            Reiniciar
          </Button>
        </DialogActions>
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
