/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  UsremoveFavAction,
  UssetFavAction,
  UsremoveCartAction,
  UsaddCartAction,
  UssetCurrentProductAction,
} from '../UsReduxStore/UsActions';
import WrapperScreen from '../UsResuables/WrapperScreen';
import {colors} from '../UsResuables/frequentColors';
import {Measurements} from '../UsResuables/Measurement';
import RefNavigation from '../UsResuables/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from 'react-native-elements';
import MyHeader from '../UsResuables/MyHeader';
import {FruityTiles} from './UsHome';
import Loop from '../UsResuables/looping';

export const Cart = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, [props.UsCart.items]);
  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);
  const goBack = () => RefNavigation.Navigate('UsHome');

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.UsCart.items);
    let UsArr = [];
    CartArray.forEach((element) => {
      UsArr.push(props.UsCart.items[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const UsGoToSingleProduct = (item) => {
    props.UssetCurrentProductAction(item);
    RefNavigation.Navigate('UsSingleProduct');
  };

  const infoScreen = () => RefNavigation.Navigate('InfoScreen');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <MyHeader
          leftIcon={Entypo}
          leftIconName="chevron-left"
          leftIconAction={goBack}
          Title="Cart"
        />
        <ScrollView>
          <View style={styles.TilesWrapper}>
            {HorizontalCartArray.length > 0 ? (
              <View style={styles.fav_SL1}>
                <Loop
                  data={HorizontalCartArray}
                  renderItem={({item}) => {
                    return (
                      <FruityTiles
                        item={item}
                        UsGoToSingleProduct={UsGoToSingleProduct}
                        UsFavs={props.UsFavs}
                        UsRemoveFavAct={(i) => props.UsremoveFavAction(i)}
                        UsSetFavAct={(i) => props.UssetFavAction(i)}
                        UsaddCartAction={(i) => props.UsaddCartAction(i)}
                        UsremoveCartAction={(i) => props.UsremoveCartAction(i)}
                        isCart={true}
                      />
                    );
                  }}
                />
              </View>
            ) : (
              <Text
                style={{
                  width: '100%',
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'center',
                }}>
                Your Cart is empty...
              </Text>
            )}
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: colors.primary,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            width: Measurements.width,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '75%',
              marginTop: Measurements.height * 0.015,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: Measurements.width * 0.035,
              }}>
              Total Amount:
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontWeight: 'bold',
                fontSize: Measurements.width * 0.05,
                backgroundColor: 'white',
                padding: 3,
                borderRadius: 8,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
              }}>
              ${props.UsTotal}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '75%',
              marginTop: Measurements.height * 0.015,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: Measurements.width * 0.035,
              }}>
              Payment Mode:
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: Measurements.width * 0.035,
              }}>
              Payment on Delivery
            </Text>
          </View>
          <View
            style={{
              paddingVertical: Measurements.height * 0.018,
              width: '80%',
            }}>
            <Button
              raised
              onPress={infoScreen}
              disabled={props.UsTotal < 1}
              title="PROCEED TO CHECKOUT"
              titleStyle={{
                fontSize: Measurements.width * 0.05,
                color: colors.primary,
                fontWeight: 'bold',
              }}
              buttonStyle={{
                paddingVertical: Measurements.height * 0.015,
                backgroundColor: colors.secondary,
              }}
              containerStyle={{
                width: '100%',
                borderRadius: 50,
              }}
            />
          </View>
        </View>
      </View>
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  TilesWrapper: {},
});

const mapStateToProps = (state) => ({
  UsCart: state.UsCartReducer,
  UsTotal: state.UsCartReducer.totalAmount,
  UsFavs: state.UsToggleFav,
});

export default connect(mapStateToProps, {
  UssetFavAction,
  UsremoveFavAction,
  UsremoveCartAction,
  UsaddCartAction,
  UssetCurrentProductAction,
})(Cart);
