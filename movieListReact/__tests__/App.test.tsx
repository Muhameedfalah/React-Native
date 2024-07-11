import 'react-native';
import React from 'react';
import App from '../App';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import fetchMock from 'jest-fetch-mock';
import { beforeEach, it, expect } from '@jest/globals';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});


it('displays loading indicator', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({
    items: [{
      "id": 1726,
      "title": "Movie1",
      "overview": "Plot of the movie",
      "poster_path": "/roster.jpg",
      "popularity": 100,
      "release_date": "2012-01-20",
      "vote_average": 9.2,
      "vote_count": 23135
    }]
  }));

  const { getByTestId } = render(<App />);

  expect(getByTestId('Loading...')).toBeTruthy();

  await waitFor(() => {
    expect(() => getByTestId('Loading...')).toThrow();
  });
});

it('fetches and displays movies correctly', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({
    items: [
      {
        "id": 1726,
        "title": "Movie1",
        "overview": "Plot of the movie",
        "poster_path": "/roster.jpg",
        "popularity": 100,
        "release_date": "2012-01-20",
        "vote_average": 9.2,
        "vote_count": 23135
      }
    ],
  }));

  const { getByText, getByTestId } = render(<App />);

  await act(async () => {
    await waitFor(() => getByTestId('movie-list'));
  });

  expect(getByText('Movie1')).toBeTruthy();
});





it('opens and closes the modal correctly', async () => {

  fetchMock.mockResponseOnce(JSON.stringify({
    items: [
      {
        "id": 1726,
        "title": "Movie1",
        "overview": "Plot of the movie",
        "poster_path": "/roster.jpg",
        "popularity": 100,
        "release_date": "2012-01-20",
        "vote_average": 9.2,
        "vote_count": 23135
      }
    ],
  }));

  const { getByText, getByTestId, queryByText } = render(<App />);
  await waitFor(() => getByTestId('movie-list'));

  const mov = getByText("Movie1");
  expect(mov).toBeTruthy();

  fireEvent.press(mov);

  const modal = getByTestId('modal');
  expect(modal).toBeTruthy();

  fireEvent.press(getByText('Close'));

  expect(queryByText('Close')).toBeNull();
});

it('displays error message on fetch failure', async () => {
  fetchMock.mockRejectOnce(new Error('Failed to fetch'));

  const { getByText } = render(<App />);

  await waitFor(() => {
    expect(getByText('Error fetching movies. Failed to fetch')).toBeTruthy();
  });
});