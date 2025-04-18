import { StyleSheet, Image, Pressable} from 'react-native';
import { Text } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { Link } from 'expo-router';
import { Tables } from '../database.types';
import RemoteImage from './RemoteImage';

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
  product: Tables<'products'>;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Link href={`../menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage 
        path={product.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode='contain'
      />


        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        
      </Pressable>
    </Link>
  )
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'black',
    padding: 10,
    borderRadius:20,
    flex: 1,
    maxWidth: '50%',
  },

  image: {
    width:'100%',
    aspectRatio: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price:{
    color: Colors.light.tint,
    fontWeight: 'bold',
  }
});
