import {User} from '../App';

export const users: User[] = [
  {
    id: 1,
    username: 'ganealex',
    password: 'ganealex',
    profilePic: 'war',
    friends: [
      {
        friendId: 2,
        status: 'accepted',
      },
      {
        friendId: 4,
        status: 'accepted',
      },
      {
        friendId: 6,
        status: 'accepted',
      },
      {
        friendId: 7,
        status: 'accepted',
      },
      {
        friendId: 3,
        status: 'pending',
      },
    ],
  },
  {
    id: 2,
    username: 'John',
    password: 'ganealex2',
    profilePic: 'goof',
    friends: [
      {
        friendId: 1,
        status: 'accepted',
      },
    ],
  },
  {
    id: 3,
    username: 'Mirel',
    password: 'ganealex3',
    profilePic: 'fox',
    friends: [],
  },
  {
    id: 4,
    username: 'George',
    password: 'ganealex3',
    profilePic: 'lady',
    friends: [],
  },
  {
    id: 5,
    username: 'Adrian',
    password: 'ganealex6',
    profilePic: 'goof',
    friends: [],
  },
  {
    id: 6,
    username: 'Ionel',
    password: 'ganealex3',
    profilePic: 'war',
    friends: [],
  },
  {
    id: 7,
    username: 'ganealex8',
    password: 'ganealex3',
    profilePic: 'fox',
    friends: [],
  },
  {
    id: 8,
    username: 'ganealex9',
    password: 'ganealex3',
    profilePic: 'fox',
    friends: [],
  },
  {
    id: 9,
    username: 'ganealex10',
    password: 'ganealex3',
    profilePic: 'goof',
    friends: [],
  },
];
