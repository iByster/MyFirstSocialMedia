import React, {useEffect, useState} from 'react';
import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';

interface EditMessageModalProps {
  visible: boolean;
  editMessage(newMessage: string): void;
  setMainModalOpen(visible: boolean): void;
  actualMessage: string | undefined;
}

export const EditMessageModal: React.FC<EditMessageModalProps> = ({
  visible,
  setMainModalOpen,
  editMessage,
  actualMessage,
}) => {
  //   const [modalVisible, setModalVisible] = useState(visible);
  const [input, setInput] = useState<string>(actualMessage!);

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
          <Input
            placeholder="new message..."
            selectionColor={'tomato'}
            defaultValue={input}
            onChangeText={setInput}
          />
          <Pressable
            style={[styles.button, styles.editButton]}
            onPress={() => editMessage(input)}>
            <Text style={styles.textStyle}>Edit</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setMainModalOpen(!visible)}>
            <Text style={styles.textStyle}>Cancel</Text>
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
    marginTop: 10,
  },
  modalView: {
    width: 300,
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
