import { permanentRedirect } from 'next/navigation';

export default async function createTask() {
  permanentRedirect(`/create-task/choose-primitive`);
}
