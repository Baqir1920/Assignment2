// App.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Import required components from react-native
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import Home from './src/screens/Home';
import ShoppingCart from './src/screens/ShoppingCart';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetails from './src/screens/ProductDetails';
import ProductsByCategory from './src/screens/ProductsByCategory';
import store from './src/store/store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProductsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductsByCategory" component={ProductsByCategory} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

const ShoppingCartIconWithBadge = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  return (
    <View>
      <FontAwesome5 name="shopping-cart" size={24} color="blue" />
      {totalQuantity > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalQuantity}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Products"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Products') {
                return <FontAwesome5 name="store" size={size} color={color} />;
              } else if (route.name === 'ShoppingCart') {
                return <ShoppingCartIconWithBadge />;
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Products" component={ProductsStack} />
          <Tab.Screen name="ShoppingCart" component={ShoppingCart} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
