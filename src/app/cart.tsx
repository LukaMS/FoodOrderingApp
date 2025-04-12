import { StatusBar } from "expo-status-bar";
import { View, Text } from "../components/Themed";
import { Platform, FlatList } from "react-native";
import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem";
import Button from "../components/Button";

const CartScreen = () => {
    const { items, total, checkout } = useCart();

    return (
        <View style={{padding:10}}>
            <FlatList 
                data={items}
                renderItem={({item}) => <CartListItem cartItem={item} />}
                contentContainerStyle={{gap:10}}
            />
            <Text style={{marginTop: 10, fontSize: 20, fontWeight: '500'}}>Total: ${total}</Text>
            <Button onPress={checkout} text="Checkout"/>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
        
    )
};

export default CartScreen;