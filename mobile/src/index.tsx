import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import 'react-native-gesture-handler';
import {Chat} from './components/Chat/Chat';
import {EditProfile} from './components/EditProfile/EditProfile';
import {Login} from './components/Login/Login';
import {Main} from './components/Main/Main';
import {Register} from './components/Register/Register';

const Stack = createNativeStackNavigator();

const errorLink = onError(
  ({graphQLErrors, networkError, response, operation}) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        console.error(
          `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
          operation,
          response,
        );
      }
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`, operation, response);
    }
  },
);

const httpLink = new HttpLink({
  uri: 'http://localhost:5910/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  // credentials: 'include',
  // defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}}
  connectToDevTools: true,
  assumeImmutableResults: true,
});

console.log(client);

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" options={{headerShown: false}}>
            {props => <Login />}
          </Stack.Screen>
          <Stack.Screen name="Register" options={{headerShown: false}}>
            {props => <Register />}
          </Stack.Screen>
          <Stack.Screen name="Main" options={{headerShown: false}}>
            {props => <Main />}
          </Stack.Screen>
          <Stack.Screen name="Chat" options={{headerShown: false}}>
            {props => <Chat />}
          </Stack.Screen>
          <Stack.Screen name="EditProfile" options={{headerShown: false}}>
            {props => <EditProfile />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
