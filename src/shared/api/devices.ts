import { http } from './http';

export type DevicePlace = {
  device_id: number;
  place: number;
  balances: number;
  currency: string;
};

export type Device = {
  id: number;
  name: string;
  places: DevicePlace[];
  created_at: string;
  updated_at: string;
};

export type ModBalanceRequest = {
  delta: number;
};

export async function getDevices(): Promise<Device[]> {
  const res = await http.get('/a/devices/');
  return res.data as Device[];
}

export async function getDeviceById(deviceId: number): Promise<Device> {
  const res = await http.get(`/a/devices/${deviceId}/`);
  return res.data as Device;
}

export async function updateDevicePlaceBalance(
  deviceId: number,
  placeId: number,
  delta: number
): Promise<DevicePlace> {
  console.log('HTTP запрос:', {
    method: 'POST',
    url: `/a/devices/${deviceId}/place/${placeId}/update`,
    data: { delta },
  });

  const res = await http.post(`/a/devices/${deviceId}/place/${placeId}/update`, {
    delta,
  } as ModBalanceRequest);

  console.log('HTTP ответ:', res);
  return res.data as DevicePlace;
}
