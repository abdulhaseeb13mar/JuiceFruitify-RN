/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Measurements} from '../UsResuables/Measurement';
import WrapperScreen from '../UsResuables/WrapperScreen';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../UsResuables/frequentColors';
import NavigationRef from '../UsResuables/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  UsremoveFavAction,
  UssetFavAction,
  UsaddCartAction,
  UsremoveCartAction,
} from '../UsReduxStore/UsActions';
import StarRating from '../StarRating/rating';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
  }, []);

  const [fav, setFav] = useState(false);
  const [sugarLevel, setSugarLevel] = useState('0%');
  const [size, setSize] = useState({size: 'Small', amount: '125ml'});
  const UsProduct = props.UsProduct;

  const checkIfFav = () => {
    for (let us = 0; us < props.UsFavs.length; us++) {
      if (props.UsFavs[us].id === UsProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const UsAddToCart = () => props.UsaddCartAction(UsProduct);

  const UsRemoveFromCart = () => {
    props.UsCart[UsProduct.id] !== undefined
      ? props.UsremoveCartAction(UsProduct)
      : null;
  };

  const toggleFav = () => {
    fav
      ? props.UsremoveFavAction(UsProduct.id)
      : props.UssetFavAction(UsProduct);
    setFav(!fav);
  };

  const UsGoBack = () => NavigationRef.Navigate('UsHome');

  return (
    <WrapperScreen style={{backgroundColor: colors.primary}}>
      <View style={styles.singleProduct_SL20}>
        <View style={styles.singleProduct_SL19}>
          <View
            style={{
              width: Measurements.width * 0.14,
              height: Measurements.width * 0.14,
              backgroundColor: 'white',
              borderRadius: 50,
              opacity: 0.2,
              transform: [{scaleX: 4.5}, {scaleY: 4}],
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
          />
          <View
            style={{
              width: Measurements.width * 0.14,
              height: Measurements.width * 0.14,
              backgroundColor: 'white',
              borderRadius: 50,
              opacity: 0.2,
              transform: [{scaleX: 3.0}, {scaleY: 2.7}],
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
          <ImageBackground
            resizeMode="contain"
            source={UsProduct.images}
            style={styles.singleProduct_SL18}>
            <View
              style={{
                marginTop: Measurements.height * 0.025,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={styles.singleProduct_SL17}
                onPress={UsGoBack}>
                <Entypo
                  name="chevron-left"
                  color={'white'}
                  size={Measurements.width * 0.08}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleFav}
                style={{
                  width: Measurements.width * 0.12,
                  height: Measurements.width * 0.12,
                  borderRadius: 50,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 3,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                }}>
                <Ionicons
                  name={fav ? 'ios-heart' : 'ios-heart-outline'}
                  color="red"
                  size={Measurements.width * 0.06}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.singleProduct_SL16}>
          <View style={styles.singleProduct_SL15}>
            <View style={styles.singleProduct_SL14} />
            <View style={styles.singleProduct_SL13}>
              <Text style={styles.singleProduct_SL12}>{UsProduct.name}</Text>
              <Text style={styles.singleProduct_SL11}>
                $
                <Text style={{fontSize: Measurements.width * 0.09}}>
                  {UsProduct.price}
                </Text>
              </Text>
            </View>
            <View style={styles.singleProduct_SL21}>
              <StarRating rating={3.5} size={Measurements.width * 0.25} />
              <Text style={styles.singleProduct_SL22}>{UsProduct.rating}</Text>
            </View>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: Measurements.width * 0.048,
              }}>
              Sugar Level
            </Text>
            <View style={styles.singleProduct_SL10}>
              {['0%', '25%', '50%', '100%'].map((i, index) => (
                <TouchableOpacity
                  onPress={() => setSugarLevel(i)}
                  key={index}
                  style={{
                    ...styles.singleProduct_SL9_1,
                    borderColor:
                      sugarLevel === i
                        ? `rgba(${colors.rgb_Primary}, 0.25)`
                        : colors.lightGrey3,
                    backgroundColor:
                      sugarLevel === i
                        ? `rgba(${colors.rgb_Primary}, 0.25)`
                        : 'white',
                  }}>
                  <Text
                    style={{
                      ...styles.singleProduct_SL8,
                      color: sugarLevel === i ? colors.primary : 'black',
                    }}>
                    {i}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: Measurements.width * 0.048,
              }}>
              Choice Size
            </Text>
            <View style={styles.singleProduct_SL10}>
              {[
                {size: 'Small', amount: '125ml'},
                {size: 'Medium', amount: '175ml'},
                {size: 'Large', amount: '250ml'},
              ].map((i, index) => (
                <TouchableOpacity
                  onPress={() => setSize(i)}
                  key={index}
                  style={{
                    ...styles.singleProduct_SL9_2,
                    borderColor:
                      size.size === i.size
                        ? `rgba(${colors.rgb_Primary}, 0.25)`
                        : colors.lightGrey3,
                    backgroundColor:
                      size.size === i.size
                        ? `rgba(${colors.rgb_Primary}, 0.25)`
                        : 'white',
                  }}>
                  <Text
                    style={{
                      ...styles.singleProduct_SL8,
                      color: size.size === i.size ? colors.primary : 'black',
                    }}>
                    {i.size}
                  </Text>
                  <Text
                    style={{
                      ...styles.singleProduct_SL7,
                      color: size.size === i.size ? colors.primary : 'black',
                    }}>
                    {i.amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.singleProduct_SL3}>
            <View style={styles.singleProduct_SL2}>
              <TouchableOpacity
                onPress={
                  props.UsCart[UsProduct.id] !== undefined &&
                  props.UsCart[UsProduct.id] !== 0
                    ? UsRemoveFromCart
                    : null
                }>
                <Ionicons
                  name="ios-remove"
                  color={colors.lightGrey3}
                  size={Measurements.width * 0.065}
                />
              </TouchableOpacity>
              <Text style={styles.singleProduct_SL23}>
                {props.UsCart[UsProduct.id] !== undefined &&
                props.UsCart[UsProduct.id] !== 0
                  ? props.UsCart[UsProduct.id].added
                  : '0'}
              </Text>
              <TouchableOpacity onPress={UsAddToCart}>
                <Ionicons
                  name="ios-add"
                  color={colors.lightGrey3}
                  size={Measurements.width * 0.065}
                />
              </TouchableOpacity>
            </View>
            <Button
              raised
              title="Add To Cart"
              onPress={UsAddToCart}
              buttonStyle={styles.singleProduct_SL1}
              containerStyle={{width: '50%'}}
            />
          </View>
        </View>
      </View>
    </WrapperScreen>
  );
}

const styles = StyleSheet.create({
  singleProduct_SL23: {
    fontWeight: 'bold',
    fontSize: Measurements.width * 0.056,
  },
  singleProduct_SL22: {
    marginLeft: Measurements.width * 0.045,
    color: colors.darkGray,
    fontSize: Measurements.width * 0.045,
    fontWeight: 'bold',
  },
  singleProduct_SL21: {
    width: Measurements.width * 0.55,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  singleProduct_SL20: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  singleProduct_SL19: {
    width: Measurements.width,
    height: Measurements.height * 0.37,
    paddingHorizontal: Measurements.width * 0.05,
  },
  singleProduct_SL18: {width: '100%', height: '100%'},
  singleProduct_SL16: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: Measurements.height * 0.62,
    width: Measurements.width,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Measurements.height * 0.01,
    paddingHorizontal: Measurements.width * 0.035,
    paddingBottom: Measurements.height * 0.02,
  },
  singleProduct_SL15: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: Measurements.height * 0.01,
  },
  singleProduct_SL14: {
    width: Measurements.width * 0.25,
    height: Measurements.width * 0.0095,
    backgroundColor: colors.darkGray,
    opacity: 0.5,
  },
  singleProduct_SL13: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Measurements.height * 0.02,
  },
  singleProduct_SL12: {
    width: '75%',
    fontWeight: 'bold',
    fontSize: Measurements.width * 0.08,
    color: colors.primary,
  },
  singleProduct_SL11: {
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    color: colors.primary,
    fontSize: Measurements.width * 0.058,
  },
  singleProduct_SL10: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Measurements.height * 0.01,
  },
  singleProduct_SL9_1: {
    width: Measurements.width * 0.2,
    borderColor: colors.lightBackground2,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Measurements.height * 0.015,
  },
  singleProduct_SL9_2: {
    width: Measurements.width * 0.2,
    borderColor: colors.lightBackground2,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Measurements.height * 0.01,
  },
  singleProduct_SL8: {
    fontWeight: 'bold',
    marginVertical: Measurements.height * 0.002,
    fontSize: Measurements.width * 0.042,
  },

  singleProduct_SL7: {
    fontSize: Measurements.width * 0.035,
    color: colors.lightGrey3,
    fontWeight: 'bold',
  },
  singleProduct_SL6: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleProduct_SL5: {
    width: '100%',
    maxHeight: Measurements.height * 0.15,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    paddingHorizontal: Measurements.width * 0.015,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  singleProduct_SL4: {
    fontSize: Measurements.width * 0.037,
    lineHeight: Measurements.height * 0.027,
    color: colors.lightGrey3,
    fontWeight: 'bold',
  },
  singleProduct_SL3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Measurements.height * 0.008,
  },
  singleProduct_SL2: {
    borderColor: colors.lightBackground2,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 50,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Measurements.width * 0.015,
    paddingVertical: Measurements.height * 0.01,
  },
  singleProduct_SL1: {
    height: Measurements.height * 0.07,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    UsProduct: state.UsCrntPrdtReducer,
    UsFavs: state.UsToggleFav,
    UsCart: state.UsCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  UssetFavAction,
  UsremoveFavAction,
  UsremoveCartAction,
  UsaddCartAction,
})(React.memo(SingleProduct));
