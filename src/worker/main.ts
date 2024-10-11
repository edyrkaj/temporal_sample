import { Worker } from '@temporalio/worker';
import * as activities from '../activities';
import { TASK_QUEUE_NAME } from '../constants';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflows'),
    activities,
    taskQueue: TASK_QUEUE_NAME,
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
