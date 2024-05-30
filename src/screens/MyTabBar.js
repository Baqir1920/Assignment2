import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';

const MyTabBar = ({ state, descriptors, navigation }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const newOrdersCount = useSelector((state) => state.orders.orders.filter(order => order.status === 'new').length);
  const totalCartQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleTabPress = (route, isFocused) => {
    if (!loggedInUser && (route.name === 'Products' || route.name === 'ShoppingCart' || route.name === 'MyOrders')) {
      Alert.alert("Not logged in", "You must login to view this tab");
      navigation.navigate('UserProfile');
      return;
    }

    if (!isFocused) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const iconName = route.name === 'Products'
          ? 'store'
          : route.name === 'ShoppingCart'
            ? 'shopping-cart'
            : route.name === 'MyOrders'
              ? 'list-alt'
              : 'user';

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => handleTabPress(route, isFocused)}
            style={styles.tab}
          >
            <FontAwesome5 name={iconName} size={24} color={isFocused ? 'blue' : 'gray'} />
            {route.name === 'MyOrders' && newOrdersCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{newOrdersCount}</Text>
              </View>
            )}
            {route.name === 'ShoppingCart' && totalCartQuantity > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalCartQuantity}</Text>
              </View>
            )}
            <Text style={{ color: isFocused ? 'blue' : 'gray' }}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default MyTabBar;
