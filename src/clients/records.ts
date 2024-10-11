import { Client } from '@temporalio/client';
// import { randomUUID } from 'node:crypto';
import { recordsWorkflow, WORKFLOW_ID } from '../workflows';
import { TASK_QUEUE_NAME } from '../constants';

async function run() {
  const client = new Client();
  const name = process.argv[2];// read input arg from cli

  const result = await client.workflow.execute(recordsWorkflow, {
    args: [name ?? 'fiat'],
    taskQueue: TASK_QUEUE_NAME,
    workflowId: WORKFLOW_ID,
  });
  console.log(`The records Workflow returned: \n ${JSON.stringify(result)}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
