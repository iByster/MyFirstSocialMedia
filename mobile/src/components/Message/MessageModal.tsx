import React from 'react';
import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';

interface MessageModalProps {
  visible: boolean;
  setMainModalOpen(visible: boolean): void;
  deleteMessage(): void;
  editMessage(): void;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  visible,
  setMainModalOpen,
  deleteMessage,
  editMessage,
}) => {
  //   const [modalVisible, setModalVisible] = useState(visible);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setMainModalOpen(!visible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={[styles.button, styles.editButton]}
            onPress={editMessage}>
            <Text style={styles.textStyle}>Edit</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.editButton]}
            onPress={deleteMessage}>
            <Text style={styles.textStyle}>Delete</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setMainModalOpen(!visible)}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#494E65',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: 'tomato',
  },
  editButton: {
    backgroundColor: 'black',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
