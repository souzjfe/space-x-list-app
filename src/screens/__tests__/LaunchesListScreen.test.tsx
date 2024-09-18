import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import LaunchesListScreen from '../LaunchesListScreen';
import { fetchLaunches } from '../../store/launchesSlice';
import { RootState, AppDispatch } from '../../store';

jest.mock('../../store/launchesSlice', () => ({
  fetchLaunches: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('LaunchesListScreen', () => {
  const mockDispatch = jest.fn();
  const mockUseSelector = jest.fn();
  const mockFetchLaunches = fetchLaunches as unknown as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const store = createStore(combineReducers({ launchesReducer: () => ({ launches: [], loading: false, pagination: {} }) }));
    const { getByText } = render(
      <Provider store={store}>
        <LaunchesListScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    expect(getByText('Search Launches')).toBeTruthy();
  });

  it('calls fetchLaunches on mount', () => {
    const store = createStore(combineReducers({ launchesReducer: () => ({ launches: [], loading: false, pagination: {} }) }));
    render(
      <Provider store={store}>
        <LaunchesListScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    expect(mockFetchLaunches).toHaveBeenCalledTimes(1);
  });

  it('calls fetchLaunches on search term change', () => {
    const store = createStore(combineReducers({ launchesReducer: () => ({ launches: [], loading: false, pagination: {} }) }));
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <LaunchesListScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    const input = getByPlaceholderText('Search Launches');
    fireEvent.changeText(input, 'new search term');

    expect(mockFetchLaunches).toHaveBeenCalledTimes(2);
  });

  it('calls fetchLaunches on page change', () => {
    const store = createStore(combineReducers({ launchesReducer: () => ({ launches: [], loading: false, pagination: {} }) }));
    const { getByText } = render(
      <Provider store={store}>
        <LaunchesListScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    const pagination = getByText('Page 1');
    fireEvent.press(pagination);

    expect(mockFetchLaunches).toHaveBeenCalledTimes(2);
  });

  it('renders loading state correctly', () => {
    const store = createStore(combineReducers({ launchesReducer: () => ({ launches: [], loading: true, pagination: {} }) }));
    const { getByText } = render(
      <Provider store={store}>
        <LaunchesListScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders launches list correctly', () => {
    const store = createStore(combineReducers({ launchesReducer: () => ({ launches: [{ id: 1, name: 'Launch 1' }], loading: false, pagination: {} }) }));
    const { getByText } = render(
      <Provider store={store}>
        <LaunchesListScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    expect(getByText('Launch 1')).toBeTruthy();
  });
});