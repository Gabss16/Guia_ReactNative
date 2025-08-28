import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';
import useFetchProducts from '../hooks/useFetchProducts';


export default function ProfileScreen() {
  const {
    productos,
    loading,
    fetchProductos,
    handleSubmit: addProduct,
  } = useFetchProducts();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  // Función para enviar formulario usando el hook
  const handleSubmit = () => {
    // Convertimos price y stock a número
    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
    };

    // Llamamos al handleSubmit del hook
    addProduct(newProduct);

    // Limpiamos campos
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agregar Producto</Text>
      <InputField label="Nombre" value={name} onChangeText={setName} />
      <InputField label="Descripción" value={description} onChangeText={setDescription} />
      <InputField label="Precio" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <InputField label="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" />
      <SubmitButton title="Guardar Producto" onPress={handleSubmit} />

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
});
