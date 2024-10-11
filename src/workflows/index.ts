import { proxyActivities } from '@temporalio/workflow';
import type * as greetingActivity from '../activities/greeting.activity';
import type * as recordsActivity from '../activities/records.activity';

export const WORKFLOW_ID = 'records_workflow';

// load activity methods
const { getGreeting } = proxyActivities<typeof greetingActivity>({
  startToCloseTimeout: '2 seconds',
});

const { getRecords } = proxyActivities<typeof recordsActivity>({
  startToCloseTimeout: '2 seconds',
});

// export functions
export async function greeting(name: string): Promise<any> {
  const greeting = await getGreeting(name);
  return greeting;
}

export async function recordsWorkflow(tbName: string): Promise<any> {
  const rows = await getRecords(tbName);
  return rows;
}