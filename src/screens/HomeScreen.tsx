import React, { useEffect, useState, useTransition } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaunches } from '../store/launchesSlice';
import { RootState, AppDispatch } from '../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Pagination from '../components/Pagination';
import { useDebouncedState } from '../hooks/useDebouncedState';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { launches, loading, pagination } = useSelector((state: RootState) => state.launchesReducer);
  const [searchTerm, setSearchTerm] = useDebouncedState('');
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    dispatch(fetchLaunches({ name: searchTerm, page }));
  }, [dispatch, searchTerm, page]);


  const handleSearch = (text: string) => {
    startTransition(() => {
      setSearchTerm(text);
      setPage(1);
    })
  }
  const handlePageChange = (page: number) => {
    startTransition(() => {
      setPage(page);
    });
  }
  console.log(launches);
  return (
    <View>
      <TextInput
        placeholder="Search Launches"
        onChangeText={handleSearch}
        style={styles.input}
      />
      <Pagination
        currentPage={page}
        {...pagination}
        onPageChange={handlePageChange}
      />
      {loading || isPending ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <FlatList
            data={launches}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={() => navigation.navigate('LaunchDetails', { launch: item })}
              >
                <Text style={styles.launchItem}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  input: { padding: 10, margin: 10, borderColor: 'gray', borderWidth: 1 },
  launchItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
});

export default HomeScreen;
