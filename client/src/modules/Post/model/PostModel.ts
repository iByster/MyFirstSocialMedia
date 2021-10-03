import UserModel from '../../User/model/UserModel';

export default class PostModel {
  title?: string;
  text?: string;
  creatorId?: number;
  creator!: UserModel;
}
