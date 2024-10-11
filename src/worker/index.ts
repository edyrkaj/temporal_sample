import { Worker } from '@temporalio/worker';
import { TASK_QUEUE_NAME } from '../constants';
import * as activities from '../activities';

async function run() {
  const worker = await Worker.create({
    activities,
    taskQueue: TASK_QUEUE_NAME,
    workflowsPath: require.resolve('../workflows'),
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
