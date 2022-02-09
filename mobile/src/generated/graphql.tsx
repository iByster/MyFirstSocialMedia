import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddFriendInput = {
  receiverUsername: Scalars['String'];
  senderId: Scalars['Float'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FriendShip = {
  __typename?: 'FriendShip';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  receiverId: Scalars['Float'];
  senderId: Scalars['Float'];
  status: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type FriendShipError = {
  __typename?: 'FriendShipError';
  message: Scalars['String'];
};

export type FriendShipResponse = {
  __typename?: 'FriendShipResponse';
  errors?: Maybe<Array<FriendShipError>>;
  friendship?: Maybe<FriendShip>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type GoblinMask = {
  __typename?: 'GoblinMask';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  photo: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['String'];
  edited: Scalars['Boolean'];
  id: Scalars['Int'];
  message: Scalars['String'];
  receiverId: Scalars['Float'];
  seen: Scalars['Boolean'];
  senderId: Scalars['Float'];
  updatedAt: Scalars['String'];
  uuid: Scalars['String'];
};

export type MessageError = {
  __typename?: 'MessageError';
  message: Scalars['String'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  errors?: Maybe<Array<MessageError>>;
  message?: Maybe<Message>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend: FriendShipResponse;
  changePassword: UserResponse;
  deleteFriendShip: FriendShipResponse;
  deleteMessage: MessageResponse;
  forgotPassword: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  sendMessage: MessageResponse;
  updateFriendShipStatus: FriendShipResponse;
  updateMessage: MessageResponse;
  updateUserProfile: UserResponse;
};


export type MutationAddFriendArgs = {
  options: AddFriendInput;
};


export type MutationChangePasswordArgs = {
  confNewPassword: Scalars['String'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationDeleteFriendShipArgs = {
  friendshipId: Scalars['Float'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationSendMessageArgs = {
  options: SendMessageInput;
};


export type MutationUpdateFriendShipStatusArgs = {
  updatePayload: UpdateStatusPayload;
};


export type MutationUpdateMessageArgs = {
  updatePayload: UpdateMessagePayload;
};


export type MutationUpdateUserProfileArgs = {
  updatePayload: UpdateProfileInput;
};

export type Query = {
  __typename?: 'Query';
  getAllFriendShipsByUser: Array<FriendShip>;
  getAllMessagesByUsers: Array<Message>;
  getMessageById?: Maybe<Message>;
  getUserById?: Maybe<User>;
  hello: Scalars['String'];
  logo: Scalars['String'];
  mask: Scalars['String'];
  me?: Maybe<User>;
  messages: Array<Message>;
  users: Array<User>;
};


export type QueryGetAllFriendShipsByUserArgs = {
  userId: Scalars['Float'];
};


export type QueryGetAllMessagesByUsersArgs = {
  userId1: Scalars['Float'];
  userId2: Scalars['Float'];
};


export type QueryGetMessageByIdArgs = {
  messageId: Scalars['Float'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['Int'];
};


export type QueryMaskArgs = {
  goblinMask: Scalars['Float'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SendMessageInput = {
  message: Scalars['String'];
  receiverId: Scalars['Float'];
  senderId: Scalars['Float'];
  uuid: Scalars['String'];
};

export type UpdateMessagePayload = {
  message: Scalars['String'];
  messageId: Scalars['String'];
};

export type UpdateProfileInput = {
  goblinMaskId: Scalars['Float'];
  userId: Scalars['Float'];
  username: Scalars['String'];
};

export type UpdateStatusPayload = {
  friendshipId: Scalars['Float'];
  status: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  goblinMask: GoblinMask;
  id: Scalars['Int'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  ok?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularFriendShipInfoFragment = { __typename?: 'FriendShip', id: number, senderId: number, receiverId: number, status: string };

export type RegularFriendShipResponseFragment = { __typename?: 'FriendShipResponse', errors?: Array<{ __typename?: 'FriendShipError', message: string }> | null | undefined, friendship?: { __typename?: 'FriendShip', id: number, senderId: number, receiverId: number, status: string } | null | undefined };

export type RegularMessageInfoFragment = { __typename?: 'Message', uuid: string, id: number, createdAt: string, senderId: number, receiverId: number, message: string, seen: boolean, edited: boolean };

export type RegularMessageResponseFragment = { __typename?: 'MessageResponse', ok?: boolean | null | undefined, errors?: Array<{ __typename?: 'MessageError', message: string }> | null | undefined, message?: { __typename?: 'Message', uuid: string, id: number, createdAt: string, senderId: number, receiverId: number, message: string, seen: boolean, edited: boolean } | null | undefined };

export type RegularUserInfoFragment = { __typename?: 'User', id: number, username: string, email: string, goblinMask: { __typename?: 'GoblinMask', photo: string } };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, email: string, goblinMask: { __typename?: 'GoblinMask', photo: string } } | null | undefined };

export type AddFriendMutationVariables = Exact<{
  senderId: Scalars['Float'];
  receiverUsername: Scalars['String'];
}>;


export type AddFriendMutation = { __typename?: 'Mutation', addFriend: { __typename?: 'FriendShipResponse', errors?: Array<{ __typename?: 'FriendShipError', message: string }> | null | undefined, friendship?: { __typename?: 'FriendShip', id: number, senderId: number, receiverId: number, status: string } | null | undefined } };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  confNewPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, email: string, goblinMask: { __typename?: 'GoblinMask', photo: string } } | null | undefined } };

export type DeleteFriendShipMutationVariables = Exact<{
  friendshipId: Scalars['Float'];
}>;


export type DeleteFriendShipMutation = { __typename?: 'Mutation', deleteFriendShip: { __typename?: 'FriendShipResponse', ok?: boolean | null | undefined, errors?: Array<{ __typename?: 'FriendShipError', message: string }> | null | undefined } };

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['String'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: { __typename?: 'MessageResponse', ok?: boolean | null | undefined, errors?: Array<{ __typename?: 'MessageError', message: string }> | null | undefined, message?: { __typename?: 'Message', uuid: string, id: number, createdAt: string, senderId: number, receiverId: number, message: string, seen: boolean, edited: boolean } | null | undefined } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'UserResponse', ok?: boolean | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, email: string, goblinMask: { __typename?: 'GoblinMask', photo: string } } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, email: string, goblinMask: { __typename?: 'GoblinMask', photo: string } } | null | undefined } };

export type SendMessageMutationVariables = Exact<{
  senderId: Scalars['Float'];
  receiverId: Scalars['Float'];
  message: Scalars['String'];
  uuid: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'MessageResponse', ok?: boolean | null | undefined, errors?: Array<{ __typename?: 'MessageError', message: string }> | null | undefined, message?: { __typename?: 'Message', uuid: string, id: number, createdAt: string, senderId: number, receiverId: number, message: string, seen: boolean, edited: boolean } | null | undefined } };

export type UpdateFriendShipStatusMutationVariables = Exact<{
  friendshipId: Scalars['Float'];
  status: Scalars['String'];
}>;


export type UpdateFriendShipStatusMutation = { __typename?: 'Mutation', updateFriendShipStatus: { __typename?: 'FriendShipResponse', ok?: boolean | null | undefined, errors?: Array<{ __typename?: 'FriendShipError', message: string }> | null | undefined, friendship?: { __typename?: 'FriendShip', id: number, senderId: number, receiverId: number, status: string } | null | undefined } };

export type UpdateMessageMutationVariables = Exact<{
  messageId: Scalars['String'];
  message: Scalars['String'];
}>;


export type UpdateMessageMutation = { __typename?: 'Mutation', updateMessage: { __typename?: 'MessageResponse', ok?: boolean | null | undefined, errors?: Array<{ __typename?: 'MessageError', message: string }> | null | undefined, message?: { __typename?: 'Message', uuid: string, id: number, createdAt: string, senderId: number, receiverId: number, message: string, seen: boolean, edited: boolean } | null | undefined } };

export type UpdateUserProfileMutationVariables = Exact<{
  userId: Scalars['Float'];
  goblinMaskId: Scalars['Float'];
  username: Scalars['String'];
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile: { __typename?: 'UserResponse', ok?: boolean | null | undefined, errors?: Array<{ __typename?: 'FieldError', message: string }> | null | undefined } };

export type GetAllFriendshipsByUserQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type GetAllFriendshipsByUserQuery = { __typename?: 'Query', getAllFriendShipsByUser: Array<{ __typename?: 'FriendShip', id: number, senderId: number, receiverId: number, status: string }> };

export type GetAllMessagesByUsersQueryVariables = Exact<{
  userId1: Scalars['Float'];
  userId2: Scalars['Float'];
}>;


export type GetAllMessagesByUsersQuery = { __typename?: 'Query', getAllMessagesByUsers: Array<{ __typename?: 'Message', uuid: string, id: number, createdAt: string, senderId: number, receiverId: number, message: string, seen: boolean, edited: boolean }> };

export type GetMessageByIdQueryVariables = Exact<{
  messageId: Scalars['Float'];
}>;


export type GetMessageByIdQuery = { __typename?: 'Query', getMessageById?: { __typename?: 'Message', uuid: string, id: number, createdAt: string, senderId: number, receiverId: number, message: string, seen: boolean, edited: boolean } | null | undefined };

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById?: { __typename?: 'User', id: number, username: string, email: string, goblinMask: { __typename?: 'GoblinMask', photo: string } } | null | undefined };

export type LogoQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoQuery = { __typename?: 'Query', logo: string };

export type MaskQueryVariables = Exact<{
  goblinMask: Scalars['Float'];
}>;


export type MaskQuery = { __typename?: 'Query', mask: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, email: string, goblinMask: { __typename?: 'GoblinMask', photo: string } } | null | undefined };

export const RegularFriendShipInfoFragmentDoc = gql`
    fragment RegularFriendShipInfo on FriendShip {
  id
  senderId
  receiverId
  status
}
    `;
export const RegularFriendShipResponseFragmentDoc = gql`
    fragment RegularFriendShipResponse on FriendShipResponse {
  errors {
    message
  }
  friendship {
    ...RegularFriendShipInfo
  }
}
    ${RegularFriendShipInfoFragmentDoc}`;
export const RegularMessageInfoFragmentDoc = gql`
    fragment RegularMessageInfo on Message {
  uuid
  id
  createdAt
  senderId
  receiverId
  message
  seen
  edited
}
    `;
export const RegularMessageResponseFragmentDoc = gql`
    fragment RegularMessageResponse on MessageResponse {
  errors {
    message
  }
  message {
    ...RegularMessageInfo
  }
  ok
}
    ${RegularMessageInfoFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserInfoFragmentDoc = gql`
    fragment RegularUserInfo on User {
  id
  username
  email
  goblinMask {
    photo
  }
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUserInfo
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserInfoFragmentDoc}`;
export const AddFriendDocument = gql`
    mutation AddFriend($senderId: Float!, $receiverUsername: String!) {
  addFriend(options: {senderId: $senderId, receiverUsername: $receiverUsername}) {
    errors {
      message
    }
    friendship {
      id
      senderId
      receiverId
      status
    }
  }
}
    `;
export type AddFriendMutationFn = Apollo.MutationFunction<AddFriendMutation, AddFriendMutationVariables>;

/**
 * __useAddFriendMutation__
 *
 * To run a mutation, you first call `useAddFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFriendMutation, { data, loading, error }] = useAddFriendMutation({
 *   variables: {
 *      senderId: // value for 'senderId'
 *      receiverUsername: // value for 'receiverUsername'
 *   },
 * });
 */
export function useAddFriendMutation(baseOptions?: Apollo.MutationHookOptions<AddFriendMutation, AddFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFriendMutation, AddFriendMutationVariables>(AddFriendDocument, options);
      }
export type AddFriendMutationHookResult = ReturnType<typeof useAddFriendMutation>;
export type AddFriendMutationResult = Apollo.MutationResult<AddFriendMutation>;
export type AddFriendMutationOptions = Apollo.BaseMutationOptions<AddFriendMutation, AddFriendMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $confNewPassword: String!, $token: String!) {
  changePassword(
    token: $token
    newPassword: $newPassword
    confNewPassword: $confNewPassword
  ) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      confNewPassword: // value for 'confNewPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const DeleteFriendShipDocument = gql`
    mutation DeleteFriendShip($friendshipId: Float!) {
  deleteFriendShip(friendshipId: $friendshipId) {
    ok
    errors {
      message
    }
  }
}
    `;
export type DeleteFriendShipMutationFn = Apollo.MutationFunction<DeleteFriendShipMutation, DeleteFriendShipMutationVariables>;

/**
 * __useDeleteFriendShipMutation__
 *
 * To run a mutation, you first call `useDeleteFriendShipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFriendShipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFriendShipMutation, { data, loading, error }] = useDeleteFriendShipMutation({
 *   variables: {
 *      friendshipId: // value for 'friendshipId'
 *   },
 * });
 */
export function useDeleteFriendShipMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFriendShipMutation, DeleteFriendShipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFriendShipMutation, DeleteFriendShipMutationVariables>(DeleteFriendShipDocument, options);
      }
export type DeleteFriendShipMutationHookResult = ReturnType<typeof useDeleteFriendShipMutation>;
export type DeleteFriendShipMutationResult = Apollo.MutationResult<DeleteFriendShipMutation>;
export type DeleteFriendShipMutationOptions = Apollo.BaseMutationOptions<DeleteFriendShipMutation, DeleteFriendShipMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: String!) {
  deleteMessage(messageId: $messageId) {
    ...RegularMessageResponse
  }
}
    ${RegularMessageResponseFragmentDoc}`;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    ok
    errors {
      ...RegularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  register(options: {username: $username, password: $password, email: $email}) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($senderId: Float!, $receiverId: Float!, $message: String!, $uuid: String!) {
  sendMessage(
    options: {senderId: $senderId, receiverId: $receiverId, message: $message, uuid: $uuid}
  ) {
    ...RegularMessageResponse
  }
}
    ${RegularMessageResponseFragmentDoc}`;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      senderId: // value for 'senderId'
 *      receiverId: // value for 'receiverId'
 *      message: // value for 'message'
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const UpdateFriendShipStatusDocument = gql`
    mutation UpdateFriendShipStatus($friendshipId: Float!, $status: String!) {
  updateFriendShipStatus(
    updatePayload: {friendshipId: $friendshipId, status: $status}
  ) {
    ok
    ...RegularFriendShipResponse
  }
}
    ${RegularFriendShipResponseFragmentDoc}`;
export type UpdateFriendShipStatusMutationFn = Apollo.MutationFunction<UpdateFriendShipStatusMutation, UpdateFriendShipStatusMutationVariables>;

/**
 * __useUpdateFriendShipStatusMutation__
 *
 * To run a mutation, you first call `useUpdateFriendShipStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFriendShipStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFriendShipStatusMutation, { data, loading, error }] = useUpdateFriendShipStatusMutation({
 *   variables: {
 *      friendshipId: // value for 'friendshipId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateFriendShipStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFriendShipStatusMutation, UpdateFriendShipStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFriendShipStatusMutation, UpdateFriendShipStatusMutationVariables>(UpdateFriendShipStatusDocument, options);
      }
export type UpdateFriendShipStatusMutationHookResult = ReturnType<typeof useUpdateFriendShipStatusMutation>;
export type UpdateFriendShipStatusMutationResult = Apollo.MutationResult<UpdateFriendShipStatusMutation>;
export type UpdateFriendShipStatusMutationOptions = Apollo.BaseMutationOptions<UpdateFriendShipStatusMutation, UpdateFriendShipStatusMutationVariables>;
export const UpdateMessageDocument = gql`
    mutation UpdateMessage($messageId: String!, $message: String!) {
  updateMessage(updatePayload: {messageId: $messageId, message: $message}) {
    ...RegularMessageResponse
  }
}
    ${RegularMessageResponseFragmentDoc}`;
export type UpdateMessageMutationFn = Apollo.MutationFunction<UpdateMessageMutation, UpdateMessageMutationVariables>;

/**
 * __useUpdateMessageMutation__
 *
 * To run a mutation, you first call `useUpdateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessageMutation, { data, loading, error }] = useUpdateMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useUpdateMessageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMessageMutation, UpdateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMessageMutation, UpdateMessageMutationVariables>(UpdateMessageDocument, options);
      }
export type UpdateMessageMutationHookResult = ReturnType<typeof useUpdateMessageMutation>;
export type UpdateMessageMutationResult = Apollo.MutationResult<UpdateMessageMutation>;
export type UpdateMessageMutationOptions = Apollo.BaseMutationOptions<UpdateMessageMutation, UpdateMessageMutationVariables>;
export const UpdateUserProfileDocument = gql`
    mutation UpdateUserProfile($userId: Float!, $goblinMaskId: Float!, $username: String!) {
  updateUserProfile(
    updatePayload: {username: $username, goblinMaskId: $goblinMaskId, userId: $userId}
  ) {
    ok
    errors {
      message
    }
  }
}
    `;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      goblinMaskId: // value for 'goblinMaskId'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const GetAllFriendshipsByUserDocument = gql`
    query GetAllFriendshipsByUser($userId: Float!) {
  getAllFriendShipsByUser(userId: $userId) {
    id
    senderId
    receiverId
    status
  }
}
    `;

/**
 * __useGetAllFriendshipsByUserQuery__
 *
 * To run a query within a React component, call `useGetAllFriendshipsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFriendshipsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFriendshipsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAllFriendshipsByUserQuery(baseOptions: Apollo.QueryHookOptions<GetAllFriendshipsByUserQuery, GetAllFriendshipsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllFriendshipsByUserQuery, GetAllFriendshipsByUserQueryVariables>(GetAllFriendshipsByUserDocument, options);
      }
export function useGetAllFriendshipsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllFriendshipsByUserQuery, GetAllFriendshipsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllFriendshipsByUserQuery, GetAllFriendshipsByUserQueryVariables>(GetAllFriendshipsByUserDocument, options);
        }
export type GetAllFriendshipsByUserQueryHookResult = ReturnType<typeof useGetAllFriendshipsByUserQuery>;
export type GetAllFriendshipsByUserLazyQueryHookResult = ReturnType<typeof useGetAllFriendshipsByUserLazyQuery>;
export type GetAllFriendshipsByUserQueryResult = Apollo.QueryResult<GetAllFriendshipsByUserQuery, GetAllFriendshipsByUserQueryVariables>;
export const GetAllMessagesByUsersDocument = gql`
    query GetAllMessagesByUsers($userId1: Float!, $userId2: Float!) {
  getAllMessagesByUsers(userId1: $userId1, userId2: $userId2) {
    ...RegularMessageInfo
  }
}
    ${RegularMessageInfoFragmentDoc}`;

/**
 * __useGetAllMessagesByUsersQuery__
 *
 * To run a query within a React component, call `useGetAllMessagesByUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMessagesByUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMessagesByUsersQuery({
 *   variables: {
 *      userId1: // value for 'userId1'
 *      userId2: // value for 'userId2'
 *   },
 * });
 */
export function useGetAllMessagesByUsersQuery(baseOptions: Apollo.QueryHookOptions<GetAllMessagesByUsersQuery, GetAllMessagesByUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMessagesByUsersQuery, GetAllMessagesByUsersQueryVariables>(GetAllMessagesByUsersDocument, options);
      }
export function useGetAllMessagesByUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMessagesByUsersQuery, GetAllMessagesByUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMessagesByUsersQuery, GetAllMessagesByUsersQueryVariables>(GetAllMessagesByUsersDocument, options);
        }
export type GetAllMessagesByUsersQueryHookResult = ReturnType<typeof useGetAllMessagesByUsersQuery>;
export type GetAllMessagesByUsersLazyQueryHookResult = ReturnType<typeof useGetAllMessagesByUsersLazyQuery>;
export type GetAllMessagesByUsersQueryResult = Apollo.QueryResult<GetAllMessagesByUsersQuery, GetAllMessagesByUsersQueryVariables>;
export const GetMessageByIdDocument = gql`
    query GetMessageById($messageId: Float!) {
  getMessageById(messageId: $messageId) {
    ...RegularMessageInfo
  }
}
    ${RegularMessageInfoFragmentDoc}`;

/**
 * __useGetMessageByIdQuery__
 *
 * To run a query within a React component, call `useGetMessageByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessageByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessageByIdQuery({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useGetMessageByIdQuery(baseOptions: Apollo.QueryHookOptions<GetMessageByIdQuery, GetMessageByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessageByIdQuery, GetMessageByIdQueryVariables>(GetMessageByIdDocument, options);
      }
export function useGetMessageByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessageByIdQuery, GetMessageByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessageByIdQuery, GetMessageByIdQueryVariables>(GetMessageByIdDocument, options);
        }
export type GetMessageByIdQueryHookResult = ReturnType<typeof useGetMessageByIdQuery>;
export type GetMessageByIdLazyQueryHookResult = ReturnType<typeof useGetMessageByIdLazyQuery>;
export type GetMessageByIdQueryResult = Apollo.QueryResult<GetMessageByIdQuery, GetMessageByIdQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($userId: Int!) {
  getUserById(userId: $userId) {
    ...RegularUserInfo
  }
}
    ${RegularUserInfoFragmentDoc}`;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const LogoDocument = gql`
    query Logo {
  logo
}
    `;

/**
 * __useLogoQuery__
 *
 * To run a query within a React component, call `useLogoQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoQuery(baseOptions?: Apollo.QueryHookOptions<LogoQuery, LogoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoQuery, LogoQueryVariables>(LogoDocument, options);
      }
export function useLogoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoQuery, LogoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoQuery, LogoQueryVariables>(LogoDocument, options);
        }
export type LogoQueryHookResult = ReturnType<typeof useLogoQuery>;
export type LogoLazyQueryHookResult = ReturnType<typeof useLogoLazyQuery>;
export type LogoQueryResult = Apollo.QueryResult<LogoQuery, LogoQueryVariables>;
export const MaskDocument = gql`
    query Mask($goblinMask: Float!) {
  mask(goblinMask: $goblinMask)
}
    `;

/**
 * __useMaskQuery__
 *
 * To run a query within a React component, call `useMaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useMaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMaskQuery({
 *   variables: {
 *      goblinMask: // value for 'goblinMask'
 *   },
 * });
 */
export function useMaskQuery(baseOptions: Apollo.QueryHookOptions<MaskQuery, MaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MaskQuery, MaskQueryVariables>(MaskDocument, options);
      }
export function useMaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MaskQuery, MaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MaskQuery, MaskQueryVariables>(MaskDocument, options);
        }
export type MaskQueryHookResult = ReturnType<typeof useMaskQuery>;
export type MaskLazyQueryHookResult = ReturnType<typeof useMaskLazyQuery>;
export type MaskQueryResult = Apollo.QueryResult<MaskQuery, MaskQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUserInfo
  }
}
    ${RegularUserInfoFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;