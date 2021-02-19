/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {UsremoveFavAction, UssetFavAction} from '../UsReduxStore/UsActions';
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
    for (let i = 0; i < props.UsFavs.length; i++) {
      if (props.UsFavs[i].id === UsProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const UsGoToInfo = () => NavigationRef.Navigate('PersonalInfoShiningLamp');

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
          <ImageBackground
            resizeMode="contain"
            source={UsProduct.images}
            style={styles.singleProduct_SL18}>
            <TouchableOpacity
              style={styles.singleProduct_SL17}
              onPress={toggleFav}>
              <Ionicons
                name={fav ? 'ios-heart' : 'ios-heart-outline'}
                color={'white'}
                size={Measurements.width * 0.08}
              />
            </TouchableOpacity>
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
          <View style={{...border, width: '100%'}}>
            <Text
              style={{
                ...border,
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
          <View style={{...border, width: '100%'}}>
            <Text
              style={{
                ...border,
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
            <TouchableOpacity
              onPress={UsGoBack}
              style={styles.singleProduct_SL2}>
              <Entypo name="cross" color={colors.darkGray} size={20} />
            </TouchableOpacity>
            <Button
              title="Buy Now"
              onPress={UsGoToInfo}
              buttonStyle={styles.singleProduct_SL1}
              containerStyle={{width: '78%'}}
            />
          </View>
        </View>
      </View>
    </WrapperScreen>
  );
}

const border = {
  borderColor: 'red',
  borderWidth: 1,
};

const styles = StyleSheet.create({
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
    ...border,
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
    ...border,
  },
  singleProduct_SL18: {width: '100%', height: '100%'},
  singleProduct_SL17: {zIndex: 3, marginTop: Measurements.height * 0.02},
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
    borderRadius: 10,
    width: '20%',
    height: Measurements.height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
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
  };
};

export default connect(mapStateToProps, {
  UssetFavAction,
  UsremoveFavAction,
})(React.memo(SingleProduct));
