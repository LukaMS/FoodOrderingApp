import Colors from "../constants/Colors";
import { Tables } from "../database.types";
import { OrderItem } from "../types";
import { defaultPizzaImage } from "./ProductListItem";
import RemoteImage from "./RemoteImage";
import { View, Text } from "./Themed";
import { StyleSheet, Image } from "react-native";
type OrderItemListItemProps = {
    item: { products: Tables<'products'>} & Tables<'order_items'>;
  };

  const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
    return (
      <View style={styles.container}>
        <RemoteImage 
          path={item.products.image}
          fallback={defaultPizzaImage}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={{ flex: 1, backgroundColor:'grey' }}>
          <Text style={styles.title}>{item.products.name}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.price}>${item.products.price.toFixed(2)}</Text>
            <Text>Size: {item.size}</Text>
          </View>
        </View>
        <View style={styles.quantitySelector}>
          <Text style={styles.quantity}>{item.quantity}</Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'grey',
      borderRadius: 10,
      padding: 5,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 75,
      aspectRatio: 1,
      alignSelf: 'center',
      marginRight: 10,
    },
    title: {
        backgroundColor:'grey',
      fontWeight: '500',
      fontSize: 16,
      marginBottom: 5,
    },
    subtitleContainer: {
        backgroundColor:'grey',
        flexDirection: 'row',
        gap: 5,
    },
    quantitySelector: {
        backgroundColor:'grey',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    quantity: {
      fontWeight: '500',
      fontSize: 18,
    },
    price: {
      color: Colors.light.tint,
      fontWeight: 'bold',
    },
  });

export default OrderItemListItem;