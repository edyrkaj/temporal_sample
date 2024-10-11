import { Client } from '@temporalio/client';
import { randomUUID } from 'node:crypto';
import { greeting } from '../workflows';
import { TASK_QUEUE_NAME } from '../constants';

async function run() {
  const client = new Client();
  const name = process.argv[2];// read input arg from cli

  const result = await client.workflow.execute(greeting, {
    args: [name ?? 'Eledi'],
    taskQueue: TASK_QUEUE_NAME,
    workflowId: 'workflow-' + randomUUID(),
  });
  console.log(`The greeting Workflow returned: ${result}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
