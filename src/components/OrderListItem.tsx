import { Pressable, StyleSheet } from "react-native";
import { Order } from "../types";
import { View, Text } from "./Themed"
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSegments, Link } from "expo-router";
import { Tables } from "../database.types";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Tables<'orders'>;
}

const OrderListItem = ({ order }: OrderListItemProps) => {
    const segments = useSegments();
    return (
        <Link href={(`/${segments[0]}/orders/${order.id}`) as any} asChild>
            <Pressable style={styles.container}>
                <View style={{backgroundColor:"grey"}}>
                    <Text style={styles.title}>Order #{order.id}</Text>
                    <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
                </View>

                <Text style={styles.status}>{order.status}</Text>
            </Pressable>
        </Link>
    )
}

export default OrderListItem;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'grey',
      padding: 10,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      marginVertical: 5,
    },
    time: {
    //   color: 'gray',
    },
    status: {
      fontWeight: '500',
    },
  });
  
