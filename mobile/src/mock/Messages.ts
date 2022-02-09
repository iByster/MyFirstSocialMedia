import {IMessage} from '../App';

export const messages: IMessage[] = [
  {
    id: 1,
    message: 'Salut!',
    senderId: 1,
    recevierId: 2,
    seen: true,
    createdAt: Date.now(),
  },
  {
    id: 2,
    message: 'Ce faci?',
    senderId: 1,
    recevierId: 2,
    seen: true,
    createdAt: Date.now(),
  },
  {
    id: 3,
    message: 'Bine, tu?',
    senderId: 2,
    recevierId: 1,
    seen: true,
    createdAt: Date.now(),
  },
  {
    id: 4,
    message: 'Bine :)',
    senderId: 1,
    recevierId: 2,
    seen: true,
    createdAt: Date.now(),
  },
];
