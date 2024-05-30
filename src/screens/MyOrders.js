import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { payOrder, receiveOrder } from '../store/orderSlice';
import { FontAwesome5 } from '@expo/vector-icons';

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const [expandedSections, setExpandedSections] = useState({
    new: false,
    paid: false,
    delivered: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const toggleOrder = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, expanded: !order.expanded } : order
    );
    dispatch({ type: 'orders/setOrders', payload: updatedOrders });
  };

  const handlePay = (orderId) => {
    dispatch(payOrder({ orderId }));
    Alert.alert('Order Paid', 'Your order has been paid.');
  };

  const handleReceive = (orderId) => {
    dispatch(receiveOrder({ orderId }));
    Alert.alert('Order Delivered', 'Your order has been delivered.');
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItemContainer}>
      <TouchableOpacity style={styles.orderSummary} onPress={() => toggleOrder(item.id)}>
        <Text style={styles.orderSummaryText}>
          Order ID: {item.id} - {item.items.length} items - ${item.items.reduce((total, i) => total + i.price * i.quantity, 0).toFixed(2)}
        </Text>
        <FontAwesome5 name={item.expanded ? 'caret-up' : 'caret-down'} size={24} color="black" />
      </TouchableOpacity>
      {item.expanded && (
        <View style={styles.orderDetails}>
          {item.items.map((product) => (
            <View key={product.id} style={styles.productContainer}>
              <Text>{product.title} - {product.quantity} x ${product.price}</Text>
            </View>
          ))}
          {item.status === 'new' && (
            <TouchableOpacity style={styles.actionButton} onPress={() => handlePay(item.id)}>
              <Text style={styles.actionButtonText}>Pay</Text>
            </TouchableOpacity>
          )}
          {item.status === 'paid' && (
            <TouchableOpacity style={styles.actionButton} onPress={() => handleReceive(item.id)}>
              <Text style={styles.actionButtonText}>Receive</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );

  const renderSection = (title, status) => {
    const filteredOrders = orders.filter((order) => order.status === status);

    return (
      <View key={status}>
        <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection(status)}>
          <Text style={styles.sectionTitle}>{title} ({filteredOrders.length})</Text>
          <FontAwesome5 name={expandedSections[status] ? 'caret-up' : 'caret-down'} size={24} color="black" />
        </TouchableOpacity>
        {expandedSections[status] && (
          <FlatList
            data={filteredOrders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrderItem}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Orders</Text>
      {renderSection('New Orders', 'new')}
      {renderSection('Paid Orders', 'paid')}
      {renderSection('Delivered Orders', 'delivered')}
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderItemContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderSummaryText: {
    fontSize: 16,
  },
  orderDetails: {
    paddingLeft: 10,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  actionButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MyOrders;
