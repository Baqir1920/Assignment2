// src/screens/ShoppingCart.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, increaseQuantity, decreaseQuantity } from '../store/cartSlice';

const ShoppingCart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping Cart</Text>
      {cartItems.length === 0 ? (
        <Text>Your shopping cart is empty</Text>
      ) : (
        <View>
          <Text>Total Items: {totalItems}</Text>
          <Text>Total Price: ${totalPrice.toFixed(2)}</Text>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => dispatch(decreaseQuantity(item.id))}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => dispatch(increaseQuantity(item.id))}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => dispatch(removeItem(item.id))}>
                  <Text style={styles.removeButton}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default ShoppingCart;
