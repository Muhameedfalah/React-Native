import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { MovieType } from '../App';

interface MovieItemProps {
  movie: MovieType;
  onPress: () => void;
}

const Movie: React.FC<MovieItemProps> = ({ movie, onPress }) => {
  return (
    <View style={styles.listContainer}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={{ width: 85, height: 120 }} />
      <View style={styles.movieItem}>
        <Text style={styles.movieTitle}>
          {movie.title}
        </Text>
        <Text style={styles.movieDetails}>Year: {new Date(movie.release_date).getFullYear()}</Text>
        <Text style={styles.movieDetails}>Grade: {movie.vote_average}</Text>
        <Button color="#3487e0" title="View Details" onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
  movieItem: {
    padding: 10,
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  movieDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default Movie;