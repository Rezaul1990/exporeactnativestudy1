// src/services/dashboardService.ts
import axios from 'axios';
import { useAuthStore, useCombinedDataStore } from '@/store/AppStore';
import { Buffer } from 'buffer';
import { combinedData } from '@/model/combinedData';

const APP_BASE_URL = 'https://appwebservices.coacha.app';



export const getCombinedData = async (clubId: number, userId: number): Promise<combinedData> => {
  const { email, password } = useAuthStore.getState(); // Zustand outside React access

  const token = Buffer.from(`${email}:${password}`).toString('base64');
  console.log('[DEBUG] Basic Auth Token:', token);

  const response = await axios.get(`${APP_BASE_URL}/api/data/combineddata3/`, {
    params: {
      v: 'cPEp5lh0Ynel', // Fixed version string
      clubId: clubId,
      userId: userId,
      country: 'UK',
    },
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  console.log('[DEBUG] Dashboard API Full Response:', response.data);

  // Only picking necessary fields
  const dashboardData: combinedData = {
    MemberCount: response.data.MemberCount,
    CoachCount: response.data.CoachCount,
    Subscribed: response.data.Subscribed,
    SevenDaysClasses: response.data.SevenDaysClasses,
  };
  // Store data in Zustand
  const { setCombinedData } = useCombinedDataStore.getState();
  setCombinedData(dashboardData);

  return dashboardData;
};
