import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Client, Connection, WorkflowClient } from '@temporalio/client';
import { recordsWorkflow } from '../workflows';
import { TASK_QUEUE_NAME } from '../constants';
//   call this via HTTP GET with a URL like:
//   http://localhost:9999/get-spanish-greeting?name=Tina
//   http://localhost:9999/get-spanish-farewell?name=Tina

const app: Express = express();
const port = 9999;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/#', (req: Request, res: Response) => {
  res.status(200);
  res.json({
    service: `🚀 Temporal Service Running 🚀`,
    version: '0.0.1'
  });
});

app.use('/get-greeting', (req: Request, res: Response) => {
  if (!req.query.name) {
    res.status(400);
    res.send(
      'Missing required name parameter. Please add ?name=John to the end of the url.'
    );
    return;
  }

  const name = req.query.name;
  res.status(200);
  res.json(`¡Hola, ${name}!`);
});


app.use('/records', async (req: Request, res: Response) => {
  const client = new Client();
  const workflowId: any = req.query?.workflowId;
  const handle = await client.workflow.start(recordsWorkflow, {
    args: ['fiat'],
    taskQueue: TASK_QUEUE_NAME,
    workflowId: workflowId
  });


  const fiatList = await handle.query('fiat', { includeUnsupported: true });
  res.status(200);
  res.json(fiatList);
  return;
});

app.use('/workflows', async (req: Request, res: Response) => {
  const connection = await Connection.connect();
  const response = await connection.workflowService.listWorkflowExecutions({
    namespace: 'default',
  });

  res.status(200);
  res.json(response);
});

app.use('/workflow-data', async (req: Request, res: Response) => {
  const connection = await Connection.connect();
  const workflowId: any = req.query?.workflowId;
  const runId: any = req.query?.runId;

  const results = (new WorkflowClient()).getHandle(workflowId, runId);
  const dataRes = await results.result();

  res.status(200);
  res.json(dataRes);
});

app.use(notFound);
app.use(errorHandler);

function notFound(req: Request, res: Response) {
  res.status(404);
  res.send({ error: 'Not found!', status: 404, url: req.originalUrl });
}

function errorHandler(err: Error, req: Request, res: Response) {
  console.error('ERROR', err);
  res.status(500);
  res.send({ error: err.message, url: req.originalUrl });
}

app
  .listen(port)
  .on('error', (e) => console.error(e))
  .on('listening', () => console.log(`Listening on http://localhost:${port}`));
