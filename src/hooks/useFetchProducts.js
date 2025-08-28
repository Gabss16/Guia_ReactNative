import { useState, useEffect } from "react";
import { Alert } from "react-native";

const ApiProducts = "https://node-1st-c73c.onrender.com/api/products";

const useFetchProducts = () => {
  // Estados del formulario
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // Estados de control
  const [errorProduct, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);

  // Limpiar datos del formulario
  const cleanData = () => {
    setId("");
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setError(null);
    setSuccess(null);
  };

  // Obtener productos
  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch(ApiProducts);
      if (!response.ok) throw new Error("Error al obtener los productos");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  // Validar campos obligatorios
  const validateFields = (product) => {
    if (!product.name || product.price === "" || product.stock === "") {
      Alert.alert("Error", "Todos los campos obligatorios deben estar completos");
      return false;
    }
    return true;
  };

  // Registrar nuevo producto
  const handleSubmit = async (newProduct) => {
    // Convertir tipos
    newProduct.price = parseFloat(newProduct.price);
    newProduct.stock = parseInt(newProduct.stock);

    if (!validateFields(newProduct)) return;

    try {
      const response = await fetch(ApiProducts, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Hubo un error al registrar el producto");

      await response.json();
      Alert.alert("Éxito", "Producto registrado correctamente");
      setSuccess("Producto registrado correctamente");
      cleanData();
      fetchProductos();
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      setError(error.message);
      Alert.alert("Error", "Ocurrió un error al registrar el producto");
    }
  };

  // Eliminar producto
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${ApiProducts}/${productId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar el producto");
      Alert.alert("Éxito", "Producto eliminado");
      fetchProductos();
    } catch (error) {
      console.error("Error deleting product:", error);
      Alert.alert("Error", "No se pudo eliminar el producto");
    }
  };

  // Llenar formulario para edición
  const updateProduct = (dataProduct) => {
    setId(dataProduct._id);
    setName(dataProduct.name);
    setDescription(dataProduct.description || "");
    setPrice(dataProduct.price.toString());
    setStock(dataProduct.stock.toString());
    setError(null);
    setSuccess(null);
  };

  // Guardar cambios de edición
  const handleUpdateProduct = async () => {
    const updatedProduct = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
    };

    if (!validateFields(updatedProduct)) return;

    try {
      const response = await fetch(`${ApiProducts}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error("Error al actualizar el producto");

      Alert.alert("Éxito", "Producto actualizado correctamente");
      setSuccess("Producto actualizado correctamente");
      cleanData();
      fetchProductos();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      setError(error.message);
      Alert.alert("Error", "No se pudo actualizar el producto");
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return {
    id,
    setId,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    stock,
    setStock,
    errorProduct,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    productos,
    setProductos,
    cleanData,
    fetchProductos,
    handleSubmit,
    deleteProduct,
    updateProduct,
    handleUpdateProduct,
  };
};

export default useFetchProducts;
