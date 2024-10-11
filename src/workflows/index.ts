import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';

export const WORKFLOW_ID = 'records_workflow';

const { getGreeting, getDBRows } = proxyActivities<typeof activities>({
  startToCloseTimeout: '2 seconds',
});

export async function greeting(name: string): Promise<any> {
  const greeting = await getGreeting(name);
  return greeting;
}

export async function recordsWorkflow(tbName: string): Promise<any> {
  const rows = await getDBRows(tbName);
  return rows;
}