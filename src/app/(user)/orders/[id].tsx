import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "../../../components/Themed";
import { ActivityIndicator, StyleSheet } from "react-native";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { FlatList } from 'react-native';
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { useOrderDetails } from "@/src/api/orders";
import { useUpdateOrderSubscription } from "@/src/api/orders/subscriptions";
const OrderDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
    
    const {data: order, isLoading, error}  = useOrderDetails(id);
    useUpdateOrderSubscription(id);

    if(isLoading){
        return <ActivityIndicator/>
    }
            
    if(error || !order){
        return <Text>Failed to fetch products</Text>
    }

    return(
        <View style={styles.container}>
            <Stack.Screen options={{title: `Order #${order.id}`}} />
            <OrderListItem order={order}/>

            <FlatList 
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item}/>}
                contentContainerStyle={{gap: 10}}
            />

        </View>
        
    )
}


export default OrderDetailsScreen;


const styles = StyleSheet.create({
    container: {
      padding: 10,
      flex: 1,
      gap: 10,
    },
  });