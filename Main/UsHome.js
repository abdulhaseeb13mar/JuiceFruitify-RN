/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import WrapperScreen from '../UsResuables/WrapperScreen';
import {colors} from '../UsResuables/frequentColors';
import {Measurements} from '../UsResuables/Measurement';
import Data from '../UsDummyData';
import Loop from '../UsResuables/looping';
import RefNavigation from '../UsResuables/RefNavigation';
import {connect} from 'react-redux';
import {
  UssetCurrentProductAction,
  UsremoveFavAction,
  UssetFavAction,
} from '../UsReduxStore/UsActions';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyHeader from '../UsResuables/MyHeader';

function UsHome(props) {
  useEffect(() => {
    // fill_Popular_Arrival();
  }, []);

  // const UsGotoFavourites = () => RefNavigation.NavigateAndReset('UsFavourites');
  // const UsGotoSearch = () => RefNavigation.Navigate('SearchShiningLamp');
  // const UsGoToSingleProduct = (item) => {
  //   props.UssetCurrentProductAction(item);
  //   RefNavigation.NavigateAndReset('UsSingleProduct');
  // };
  return (
    <WrapperScreen style={{backgroundColor: colors.lightGrey4}}>
      <ScrollView bounces={false} style={{flex: 1}}>
        <MyHeader
          leftIcon={Feather}
          leftIconName="shopping-bag"
          // leftIconAction={GotoCart}
          // rightIconAction={GotoSearch}
          rightIcon={Feather}
          rightIconName="shopping-bag"
          Title="Take and Easy"
        />
        {/* <View style={styles.listingWrapper}>
          <Loop
            data={mostPopular}
            renderItem={({item}) => (
              <MostPopular
                item={item}
                UsGoToSingleProduct={UsGoToSingleProduct}
                UsFavs={props.ourFavs}
                UsRemoveFavAct={(i) => props.UsremoveFavAction(i)}
                UsSetFavAct={(i) => props.UssetFavAction(i)}
              />
            )}
          />
        </View> */}
      </ScrollView>
    </WrapperScreen>
  );
}

const MostPopular = ({
  item,
  UsGoToSingleProduct,
  UsFavs,
  UsRemoveFavAct,
  UsSetFavAct,
}) => {
  useEffect(() => {
    checkIfFav();
  }, []);

  const [fav, setFav] = useState(false);

  const checkIfFav = () => {
    for (let i = 0; i < UsFavs.length; i++) {
      if (UsFavs[i].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? UsRemoveFavAct(item.id) : UsSetFavAct(item);
    setFav(!fav);
  };
  return (
    <TouchableOpacity
      onPress={() => UsGoToSingleProduct(item)}
      style={styles.ExploreTileWrapper}>
      <View style={styles.EP_1}>
        <View style={styles.EP_2}>
          <ImageBackground
            source={item.images}
            style={styles.EP_3}
            resizeMode="contain">
            <TouchableOpacity style={styles.EP_7} onPress={toggleFav}>
              <Ionicons
                name="ios-heart"
                color={fav ? colors.primary : 'white'}
                size={Measurements.width * 0.055}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
      <View style={styles.EP_4}>
        <Text style={styles.EP_5}>{item.productName}</Text>
        <Text style={styles.EP_6}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  UsHome_SL9: {},
  UsHome_SL8: {},
  UsHome_SL7: {},
  UsHome_SL5: {},
  UsHome_SL4: {},
  UsHome_SL3: {},
  UsHome_SL2: {},
  UsHome_SL1: {},
  home_TE6: {},
  home_TE7: {},
  home_TE15: {},
  home_TE14: {},
  home_TE13: {},
  home_TE11: {},
  home_TE10: {},
  home_TE9: {},
  home_TE8: {},
  EP_7: {},
  EP_7_2: {},
  EP_6: {},
  EP_5: {},
  EP_4: {},
  EP_3: {},
  EP_2: {},
  EP_1: {},
  ExploreTileWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 20,
    marginVertical: Measurements.height * 0.008,
    marginHorizontal: Measurements.width * 0.05,
  },
});

const mapStateToProps = (state) => {
  return {
    ourFavs: state.UsToggleFav,
  };
};

export default connect(mapStateToProps, {
  UssetCurrentProductAction,
  UsremoveFavAction,
  UssetFavAction,
})(UsHome);
