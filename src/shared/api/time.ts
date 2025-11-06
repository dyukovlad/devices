import { http } from './http';

export async function getCurrentTime(): Promise<number> {
  const res = await http.get('/time');
  return res.data as number;
}
