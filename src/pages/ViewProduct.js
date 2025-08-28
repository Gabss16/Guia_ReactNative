import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductCard from "../components/ProductCard";
import { useNavigation } from '@react-navigation/native';




export default function ProfileScreen() {
  const { productos, loading, fetchProductos, deleteProduct } =
    useFetchProducts();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#6200ee"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(item) => item._id} // suponiendo que tu schema MongoDB genera _id
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              deleteProduct={deleteProduct}
              onPress={(product) => {
                // Función para llenar formulario y editar
                updateProduct(product);
              }}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20, backgroundColor: "#f5f5f5" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
