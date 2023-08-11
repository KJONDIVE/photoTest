// *** NPM ***
import React, {useState} from 'react';
import {Text, TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

// *** PROPS ***
interface IImageZoomModalProps {
  isVisible: boolean;
  imageUrl: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageZoomModal: React.FC<IImageZoomModalProps> = ({
  isVisible,
  imageUrl,
  onClose,
}) => {
  // *** USE STATE ***
  const [scale, setScale] = useState(1);

  // *** HANDLERS ***
  const handleDoubleTap = () => {
    setScale(scale === 1 ? 2 : 1);
  };

  return (
    <Modal style={styles.modalContainer} isVisible={isVisible}>
      <TouchableOpacity
        onPress={() => onClose(false)}
        style={styles.closeButton}>
        <Text style={styles.closeButtonIcon}>X</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} onPress={handleDoubleTap}>
        <Image
          source={{uri: imageUrl}}
          style={[styles.zoomableImage, {transform: [{scale}]}]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Modal>
  );
};

// *** STYLES ***
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonIcon: {
    color: 'white',
    fontSize: 30,
  },
  zoomableImage: {
    width: 300,
    height: 400,
  },
});

export default ImageZoomModal;
