import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Movie } from '../App';

interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  return (
    <View style={styles.movieItem}>
      <Text style={styles.movieTitle}>{movie.title}</Text>
      <Text style={styles.movieDetails}>Year: {new Date(movie.release_date).getFullYear()}</Text>
      <Text style={styles.movieDetails}>Grade: {movie.vote_average}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  movieDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default MovieItem;