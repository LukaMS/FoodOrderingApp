import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "../../../components/Themed";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import OrderListItem from "@/src/components/OrderListItem";
import { FlatList } from 'react-native';
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { OrderStatusList } from "@/src/types";
import Colors from "@/src/constants/Colors";
import { useOrderDetails, useUpdateOrder } from "@/src/api/orders";

const OrderDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const {data: order, isLoading, error}  = useOrderDetails(id);
    const {mutate: updateOrder} = useUpdateOrder();

    const updateStatus = (status: string) => {
        updateOrder({id, updatedFields: {status}}, {
            onSuccess: () => {
                console.log('Order status updated successfully');
            },
            onError: (error) => {
                console.error('Error updating order status:', error);
            },
        });
    }

    if(isLoading){
        return <ActivityIndicator/>
    }
        
    if(error || !order){
        return <Text>Failed to fetch products</Text>
    }


    return(
        <View style={styles.container}>
            <Stack.Screen options={{title: `Order #${order.id}`}} />
            

            <FlatList 
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item}/>}
                contentContainerStyle={{gap: 10}}
                ListHeaderComponent={() => <OrderListItem order={order}/>}
                ListFooterComponent={() => 
                    <>
                    <Text style={{ fontWeight: 'bold' }}>Status</Text>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        {OrderStatusList.map((status) => (
                        <Pressable
                            key={status}
                            onPress={() => updateStatus(status)}
                            style={{
                            borderColor: Colors.light.tint,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 5,
                            marginVertical: 10,
                            backgroundColor:
                                order.status === status
                                ? Colors.light.tint
                                : 'transparent',
                            }}
                        >
                            <Text
                            style={{
                                color:
                                order.status === status ? 'white' : Colors.light.tint,
                            }}
                            >
                            {status}
                            </Text>
                        </Pressable>
                        ))}
                    </View>
                    </>

                }
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