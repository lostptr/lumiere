import { StyleSheet, View } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";

interface BottomSheetProps {
  visible: boolean,
  onDismiss: () => void,
  children: React.ReactNode,
}

export default function BottomSheet({ visible, onDismiss, children }: BottomSheetProps) {
  return <Portal>
    <Modal
      style={styles.modal}
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modalContainer}
    >
      <View>
        <TopBar />

        {children}
      </View>
    </Modal>
  </Portal>
}

function TopBar() {
  return <View style={styles.topBar} />
}

<View style={{}} />
const styles = StyleSheet.create({
  modal: {
    flexDirection: 'row-reverse',
  },

  topBar: {
    borderRadius: 4,
    width: 40,
    height: 4,
    marginBottom: 12,
    alignSelf: 'center',
    backgroundColor: '#cccccc',
  },

  modalContainer: {
    alignSelf: 'flex-end',
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    flexGrow: 1,
    padding: 12,
    backgroundColor: '#FFF',
  }
});