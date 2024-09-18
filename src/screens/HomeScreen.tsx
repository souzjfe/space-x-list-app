import React, { useEffect, useState, useTransition } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaunches } from '../store/launchesSlice';
import { RootState, AppDispatch } from '../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const launches = useSelector((state: RootState) => state.launches.launches);
  const loading = useSelector((state: RootState) => state.launches.loading);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch, searchTerm]);

  const filteredLaunches = launches.filter((launch) =>
    launch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View>
      <TextInput
        placeholder="Search Launches"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.input}
      />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={filteredLaunches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('LaunchDetails', { launch: item })}
            >
              <Text style={styles.launchItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: { padding: 10, margin: 10, borderColor: 'gray', borderWidth: 1 },
  launchItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
});

export default HomeScreen;
