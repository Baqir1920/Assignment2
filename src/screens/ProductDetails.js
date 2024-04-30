import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 

const ProductDetails = ({ route }) => {
  const navigation = useNavigation();
  const { product } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddToBasket = () => {
    console.log('Product added to basket');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Details</Text>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>
       Price: ${product.price} | Rating: {product.rating.rate} | Sales: {product.rating.count}
      </Text>
      <Text style={styles.description}>{product.description}</Text>
      <TouchableOpacity onPress={handleAddToBasket} style={styles.addToBasketButton}>
        <FontAwesome name="shopping-basket" size={24} color="white" />
        <Text style={styles.addToBasketButtonText}>Add to Basket</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="white" />
        <Text style={styles.backButtonText}>Back to Products</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    borderWidth: 1,
    textAlign: 'center',
    padding: 30,
    borderRadius: 10,
    backgroundColor: 'black',
    color: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 5,
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: 'lightgrey'
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justified',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
  },
  addToBasketButton: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  addToBasketButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  backButton: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProductDetails;
