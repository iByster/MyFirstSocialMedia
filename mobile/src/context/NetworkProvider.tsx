import React from 'react';
import NetInfo from '@react-native-community/netinfo';

export const NetworkContext = React.createContext({isConnected: true});

export class NetworkProvider extends React.PureComponent {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    NetInfo.addEventListener(this.handleConnectivityChange);

    // The fetch is not needed as the listen will send the current state when you subscribe to it
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(this.handleConnectivityChange);
  }

  handleConnectivityChange = (state: any) => {
    if (state.isConnected) {
      this.setState({connection_Status: 'Online'});
    } else {
      this.setState({connection_Status: 'Offline'});
    }
  };

  render() {
    return (
      <NetworkContext.Provider value={this.state}>
        {this.props.children}
      </NetworkContext.Provider>
    );
  }
}
