import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Movie } from '../App';

interface MovieModalProps {
  visible: boolean;
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ visible, movie, onClose }) => {
  if (!movie) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      testID='movie-modal'
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>{movie.title}</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image
            style={styles.poster}
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          />
          <Text style={styles.modalDetails}>Plot: {movie.overview}</Text>
          <Text style={styles.modalDetails}>Score: {movie.vote_average}</Text>
          <Text style={styles.modalDetails}>Votes: {movie.vote_count}</Text>
        </ScrollView>
        <TouchableOpacity onPress={onClose} activeOpacity={0.5}>
          <Text style={styles.closeButton}>Close</Text>
        </TouchableOpacity>
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
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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