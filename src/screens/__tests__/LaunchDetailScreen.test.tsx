import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LaunchDetailsScreen from '../LaunchDetailsScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const mockRoute = {
  params: {
    launch: {
      date_utc: '2024-09-18T12:00:00Z',
      details: 'Rocket launched successfully!',
      links: {
        youtube_id: 'dQw4w9WgXcQ',
        article: 'https://example.com/article',
      },
    },
  },
};

const mockNavigation = {
  navigate: mockNavigate,
};

describe('LaunchDetailsScreen', () => {
  it('renders correctly with launch details', () => {
    const { getByText, getByRole } = render(
      <LaunchDetailsScreen route={mockRoute as any} navigation={mockNavigation as any} />
    );

    expect(getByText('Date: 18/09/2024')).toBeTruthy();
    expect(getByText('Details: Rocket launched successfully!')).toBeTruthy();
    expect(getByRole('button', { name: 'Read Article' })).toBeTruthy();
  });

  it('does not render article button if no article link is provided', () => {
    const noArticleRoute = {
      params: {
        launch: {
          date_utc: '2024-09-18T12:00:00Z',
          details: 'Rocket launched successfully!',
          links: {
            youtube_id: 'dQw4w9WgXcQ',
            article: '',
          },
        },
      },
    };

    const { queryByRole } = render(
      <LaunchDetailsScreen route={noArticleRoute as any} navigation={mockNavigation as any} />
    );

    expect(queryByRole('button', { name: 'Read Article' })).toBeNull();
  });

  it('navigates to WebViewScreen when article button is pressed', () => {
    const { getByRole } = render(
      <LaunchDetailsScreen route={mockRoute as any} navigation={mockNavigation as any} />
    );

    fireEvent.press(getByRole('button', { name: 'Read Article' }));

    expect(mockNavigate).toHaveBeenCalledWith('WebViewScreen', { url: 'https://example.com/article', webViewName: 'Article' });
  });

  it('renders VideoPlayer component if youtube_id is provided', () => {
    const { getByTestId } = render(
      <LaunchDetailsScreen route={mockRoute as any} navigation={mockNavigation as any} />
    );

    expect(getByTestId('video-player')).toBeTruthy();
  });

  it('does not render VideoPlayer component if youtube_id is not provided', () => {
    const noYoutubeIdRoute = {
      params: {
        launch: {
          date_utc: '2024-09-18T12:00:00Z',
          details: 'Rocket launched successfully!',
          links: {
            youtube_id: '',
            article: 'https://example.com/article',
          },
        },
      },
    };

    const { queryByTestId } = render(
      <LaunchDetailsScreen route={noYoutubeIdRoute as any} navigation={mockNavigation as any} />
    );

    expect(queryByTestId('video-player')).toBeNull();
  });
});
