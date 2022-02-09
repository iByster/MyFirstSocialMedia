import {IMessage} from '../App';

export const getMessages = (
  senderId: number,
  receiverId: number,
  messages: IMessage[],
) => {
  return messages.filter(
    message =>
      (message.recevierId === receiverId && message.senderId === senderId) ||
      (message.recevierId === senderId && message.senderId === receiverId),
  );
};

export const getMessage = (messageId: number, messages: IMessage[]) => {
  return messages.find(message => message.id === messageId)!;
};
