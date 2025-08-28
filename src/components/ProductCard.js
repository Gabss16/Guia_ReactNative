import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProductCard({ item, onPress, deleteProduct }) {
  return (
    <View style={styles.card}>
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description || 'Sin descripción'}</Text>
      <View style={styles.row}>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.productStock}>Stock: {item.stock}</Text>
      </View>

      {/* Botones de editar y eliminar */}
      <View style={styles.buttonRow}>
        {onPress && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onPress(item)}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        )}

        {deleteProduct && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteProduct(item._id)}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    alignItems: 'flex-start',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
    textAlign: 'left',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(14, 3, 34, 1)',
  },
  productStock: {
    fontSize: 14,
    color: '#999',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10, // separa los botones
  },
  editButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
