import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Image, Pressable, StyleSheet } from "react-native";
import { View, Text } from "../../../components/Themed";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { useState } from "react";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { useProduct } from "@/src/api/products";
import RemoteImage from "@/src/components/RemoteImage";

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const {data: product, error, isLoading} = useProduct(id);


  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  if(isLoading){
      return <ActivityIndicator/>
    }
  
  if(error){
    return <Text>Failed to fetch products</Text>
  }
  
  const addToCart = () => {
    addItem(product, selectedSize);
    router.push('/cart');
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product.name}} />
      <RemoteImage 
        path={product?.image}
        fallback={defaultPizzaImage} 
        style={styles.image} 
      />

      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map(size => (
          <Pressable 
            onPress={() => { setSelectedSize(size)}}
            style={[
              styles.size, 
              {
                backgroundColor: selectedSize == size ? 'gainsboro' : 'black'
              }
            ]} 
            key={size}
          >
            <Text style={[styles.sizeText, {color: selectedSize == size ? 'black' : 'grey'}]}>{size}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to Cart" />
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
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size:{
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent:'center',
  },
    sizeText:{
    fontSize: 20,
  }
});

export default ProductDetailsScreen;