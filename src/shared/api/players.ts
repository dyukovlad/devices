import { http } from './http';

export type Player = {
  id: string;
  name: string;
  balance: number;
};

export async function deposit(playerId: string, amount: number): Promise<Player> {
  const res = await http.post(`/api/players/${playerId}/deposit`, { amount });
  return res.data as Player;
}

export async function withdraw(playerId: string, amount: number): Promise<Player> {
  const res = await http.post(`/api/players/${playerId}/withdraw`, { amount });
  return res.data as Player;
}
