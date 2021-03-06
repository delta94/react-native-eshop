import React from 'react';
import { Icon } from "react-native-elements";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Platform, SafeAreaView, Button, View } from "react-native";
import { useDispatch } from "react-redux";

// Actions
import * as authActions from '../store/actions/auth'

// Screens
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import OrderDetailScreen from '../screens/shop/OrderDetailScreen';
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from "../screens/StartupScreen";

// Constants
import Colors from "../constants/Colors";
import WelcomeScreen from '../screens/user/WelcomeScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Icon name="shopping-cart" color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen,
    OrderDetail: OrderDetailScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Icon name="list" color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavOptions
});

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Icon name="edit" color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavOptions
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
},
    {
        contentOptions: {
            activeTintColor: Colors.primary
        },
        contentComponent: props => {
            const dispatch = useDispatch()
            return <View>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems {...props} />
                    <View style={{ margin: 20 }}>
                        <Button
                            title='Logout'
                            color={Colors.primary}
                            onPress={() => {
                                dispatch(authActions.logout())
                                // props.navigation.navigate('Welcome')
                            }}
                        />
                    </View>
                </SafeAreaView>
            </View>
        }
    })

const AuthNavigator = createStackNavigator({
    Welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    Auth: {
        screen: AuthScreen,
        navigationOptions: {
            title: '',
            headerTransparent: {
                backgroundColor: 'transparent'
            },
        }
    }
})

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
})

export default createAppContainer(MainNavigator);