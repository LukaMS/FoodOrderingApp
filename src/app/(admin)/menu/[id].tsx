import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Image, Pressable, StyleSheet } from "react-native";
import { View, Text } from "../../../components/Themed";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { useState } from "react";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import { useProduct } from "@/src/api/products";
import RemoteImage from "@/src/components/RemoteImage";

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  
  const {data: product, error, isLoading} = useProduct(id);
  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

  if(isLoading){
        return <ActivityIndicator/>
      }
    
  if(error || !product){
    return <Text>Failed to fetch products</Text>
  }

  const addToCart = () => {
    addItem(product, selectedSize);
    router.push('/cart');
  }

  return (

    <View style={styles.container}>

      <Stack.Screen 
            options={{ title: 'Menu',
              headerRight: () => (
                <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="pencil"
                        size={25}
                        color={Colors.light.tint}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
             }}
          />

      <Stack.Screen options={{title: product.name}} />
      <RemoteImage 
        path={product?.image}
        fallback={defaultPizzaImage} 
        style={styles.image} 
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize:20,
  },
});

export default ProductDetailsScreen;