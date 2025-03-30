import api from './api';
import {validateMediaRN} from '@src/utils/validatorUtils';

interface EventData {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  total_tickets: number;
  total_discount_tickets: number;
  discounted_value: number;
  price: number;
  location: string;
  type: string;
  tags: string;
  image: string;
  status: 'active' | 'inactive' | 'cancelled';
}

export const createEvent = async (eventData: EventData) => {
  try {
    const formData = new FormData();

    // Handle image upload
    if (eventData.image?.startsWith('file://')) {
      formData.append('image', {
        uri: eventData.image,
        type: 'image/jpeg',
        name: 'event_image.jpg',
      });
    }

    // Append all data as strings
    Object.entries(eventData).forEach(([key, value]) => {
      if (
        key !== 'image' ||
        (key === 'image' && !value?.startsWith('file://'))
      ) {
        formData.append(key, String(value));
      }
    });

    const response = await api.post('/event', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Event creation failed');
  }
};
