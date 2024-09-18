import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import LaunchesListScreen from '../LaunchesListScreen';
import { fetchLaunches } from '../../store/launchesSlice';
import { renderWithProviders } from '../../utils/testsUnitsRedux';
import { LaunchData } from '../../dtos/spaceX/launches';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('../../store/launchesSlice', () => ({
  fetchLaunches: jest.fn(),
}));

describe('LaunchesList Screen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = renderWithProviders(
      <LaunchesListScreen navigation={{ navigate: mockNavigate } as any} />
    );

    expect(getByPlaceholderText('Search Launches')).toBeTruthy();
  });

  it('should dispatch fetchLaunches when component mounts', () => {
    renderWithProviders(
      <LaunchesListScreen navigation={{ navigate: mockNavigate } as any} />
    );

    expect(fetchLaunches).toHaveBeenCalledWith({ name: '', page: 1 });
  });

  it('should update searchTerm and page when user types in search input', async () => {
    const { getByPlaceholderText } = renderWithProviders(
      <LaunchesListScreen navigation={{ navigate: mockNavigate } as any} />
    );

    const searchInput = getByPlaceholderText('Search Launches');
    
    fireEvent.changeText(searchInput, 'Falcon');

    await waitFor(() => {
      expect(fetchLaunches).toHaveBeenCalledWith({ name: 'Falcon', page: 1 });
    });
  });

  it('should show loading indicator when loading is true', () => {
    const { getByText } = renderWithProviders(
      <LaunchesListScreen navigation={{ navigate: mockNavigate } as any} />,
      { preloadedState: { launchesReducer: { launches: [], loading: true, pagination: { totalPages: 5 } } } }
    );

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('should render FlatList with launches when loading is false', () => {
    const { getByText } = renderWithProviders(
      <LaunchesListScreen navigation={{ navigate: mockNavigate } as any} />,
      { preloadedState: { launchesReducer: { launches: [{ id: '1', name: 'Falcon 1' } as LaunchData], loading: false, pagination: { totalPages: 5 } } } }
    );

    expect(getByText('Falcon 1')).toBeTruthy();
  });

  it('should navigate to LaunchDetails when a launch is pressed', () => {
    const { getByText } = renderWithProviders(
      <LaunchesListScreen navigation={{ navigate: mockNavigate } as any} />,
      { preloadedState: { launchesReducer: { launches: [{ id: '1', name: 'Falcon 1' } as LaunchData], loading: false, pagination: { totalPages: 5 } } } }
    );

    fireEvent.press(getByText('Falcon 1'));

    expect(mockNavigate).toHaveBeenCalledWith('LaunchDetails', { launch: { id: '1', name: 'Falcon 1' } });
  });

  it('should call handlePageChange when pagination button is clicked', async () => {
    const { getByLabelText } = renderWithProviders(
      <LaunchesListScreen navigation={{ navigate: mockNavigate } as any} />,
      { preloadedState: { launchesReducer: { launches: [{ id: '1', name: 'Falcon 1' } as LaunchData], loading: false, pagination: { totalPages: 5 } } } }
    );

    const nextButton = getByLabelText('Next page');
    fireEvent.press(nextButton);

    await waitFor(() => {
      expect(fetchLaunches).toHaveBeenCalledWith({ name: '', page: 2 });
    });
  });
});
