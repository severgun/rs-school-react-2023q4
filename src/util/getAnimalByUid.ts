import axios from 'axios';
import { IAnimalFullResponse } from '../types';

export default async function getAnimalByUid(
  uid: string
): Promise<IAnimalFullResponse | null> {
  try {
    const response = await axios.get(
      `https://stapi.co/api/v1/rest/animal?uid=${uid}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('API Request Failed', error);
    return null;
  }
}
