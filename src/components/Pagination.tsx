import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePrevious}
        disabled={currentPage === 1}
        style={currentPage === 1 ? styles.disabledButton : styles.button}
      >
        <Icon name="chevron-back-outline" size={24} color={currentPage === 1 ? '#ccc' : '#000'} />
      </TouchableOpacity>

      <Text style={styles.pageInfo}>{`Page ${currentPage} of ${totalPages}`}</Text>

      <TouchableOpacity
        onPress={handleNext}
        disabled={currentPage === totalPages}
        style={currentPage === totalPages ? styles.disabledButton : styles.button}
      >
        <Icon name="chevron-forward-outline" size={24} color={currentPage === totalPages ? '#ccc' : '#000'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pageInfo: {
    fontSize: 16,
  },
  button: {
    padding: 10,
  },
  disabledButton: {
    padding: 10,
    opacity: 0.5,
  },
});

export default Pagination;
