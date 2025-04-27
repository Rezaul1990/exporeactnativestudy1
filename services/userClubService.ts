import axios from 'axios';
import { useAuthStore } from '@/store/AppStore';
import { ClubUser } from '@/model/ClubUser';
import { Buffer } from 'buffer';

const APP_BASE_URL = 'https://appwebservices.coacha.app/api/data/getsiblings?v=27YOc9j91U4p';

export const getProfileData = async (): Promise<ClubUser[]> => {
  const { email, password } = useAuthStore.getState(); // ✅ Zustand works outside React too

  const token = Buffer.from(`${email}:${password}`).toString('base64');
  console.log('[DEBUG] Token:', token); // 👈 SEE WHAT CAME BACK

  const response = await axios.get(`${APP_BASE_URL}api/data/getsiblings`, {
    params: { country: 'UK' },
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  console.log('[DEBUG] Profile data response:', response.data); // 👈 SEE WHAT CAME BACK
  return response.data;
};
