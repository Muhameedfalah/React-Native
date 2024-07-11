import React from 'react';
import { Modal, View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { MovieType } from '../App';

interface MovieModalProps {
  visible: boolean;
  movie: MovieType | null;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ visible, movie, onClose }) => {
  if (!movie) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      testID='modal'
    >
      <View style={styles.modalView}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image
            style={styles.poster}
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          />
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={styles.modalDetails}>Plot: {movie.overview}</Text>
            <Text style={styles.modalDetails}>Score: {movie.vote_average}</Text>
            <Text style={styles.modalDetails}>Votes: {movie.vote_count}</Text>
          </View>
        </ScrollView>
        <Button title="Close" onPress={onClose} color={"red"} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    marginTop: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  modalDetails: {
    fontSize: 16,
    marginVertical: 5,
    color: '#666',
  },
  poster: {
    width: 200,
    height: 300,
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 15,
    fontSize: 18,
    color: 'red',
  },
});

export default MovieModal;