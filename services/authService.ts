import { BASE_URL } from '@/config';
import { Club } from '@/model/Club';
import { User } from '@/model/User';
import { Buffer } from 'buffer';
import axios from 'axios';

export async function loginUser({ username, password }: User): Promise<Club[]> {
  const token = Buffer.from(`${username}:${password}`).toString('base64');

  const response = await axios.get<Club[]>(`${BASE_URL}?country=UK`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return response.data;
}
