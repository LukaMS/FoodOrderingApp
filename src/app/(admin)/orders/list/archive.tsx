import orders from "@/assets/data/orders";
import { useAdminOrderList } from "@/src/api/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { View, Text } from "@/src/components/Themed";
import { ActivityIndicator, FlatList } from "react-native";

export default function OrdersScreen(){

    const { data: orders, isLoading, error } = useAdminOrderList({archived: true});
    
        if(isLoading){
          return <ActivityIndicator/>
        }
    
        if(error){
          return<Text>Failed to fetch data</Text>
        }

    return (
        <FlatList 
          data={orders}
          renderItem={({ item }) => <OrderListItem order={item}/>}
          numColumns={1}
          contentContainerStyle={{gap: 10, padding: 10}}
        />
    );
}
