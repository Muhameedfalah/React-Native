import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import MovieModal from './components/Modal';
import Movie from './components/Movie';

export interface MovieType {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      await fetch('https://api.themoviedb.org/3/list/5?api_key=d4bc3c640586e7f90dc68d8b300247ff&language=en-US')
        .then(response => response.json())
        .then(data => {
          if (data.items && data.items.length > 0) {
            setMovies(data.items);
          } else {
            setError('No movies found.');
          }
          setLoading(false);
        })
        .catch(error => {
          setError('Error fetching movies. ' + error.message);
          setLoading(false);
        });
    }

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>
        Movies
      </Text>
      {loading ? (
        <View testID='Loading...' style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2477d1" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : movies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No movies available.</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.movieList} testID='movie-list'>
            {movies.map(movie => (
              <Movie key={movie.id} movie={movie} onPress={() => {
                setSelectedMovie(movie);
                setModalVisible(true);
              }} />
            ))}
          </View>
        </ScrollView>
      )}
      <MovieModal
        visible={modalVisible}
        movie={selectedMovie}
        onClose={() => {
          setModalVisible(false);
          setSelectedMovie(null);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    paddingLeft: 20,
    color: "white",
    backgroundColor: "#2477d1",
  },
  movieList: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
});

export default App;