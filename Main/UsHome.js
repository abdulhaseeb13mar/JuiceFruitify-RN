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
import Search from '../UsResuables/searchingBar';
import c from '../UsPics/a6.png';

function UsHome(props) {
  useEffect(() => {
    Usct(Data.category[0]);
  }, []);

  const [UScategories, setUsCategories] = useState(Data.category);
  const [Uscc, setUsCC] = useState(Data.category[0]);
  const [UsTabProducts, setUsTabProducts] = useState([]);

  const Usct = (tab) => {
    setUsCC(tab);
    const fPrd = Data.product.filter((item) => item.categoryId === tab.id);
    setUsTabProducts(fPrd);
  };

  // const UsGotoFavourites = () => RefNavigation.NavigateAndReset('UsFavourites');
  // const UsGotoSearch = () => RefNavigation.Navigate('SearchShiningLamp');
  const UsGoToSingleProduct = (item) => {
    props.UssetCurrentProductAction(item);
    RefNavigation.NavigateAndReset('UsSingleProduct');
  };
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
          Title=""
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: Measurements.height * 0.02,
          }}>
          <TouchableOpacity>
            <Search editable={false} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginVertical: Measurements.height * 0.02,
            ...border,
          }}>
          <Loop
            data={UScategories}
            renderItem={({item}) => (
              <FruitifyTabs item={item} Uscc={Uscc} Usct={Usct} />
            )}
          />
        </View>

        <View style={styles.listingWrapper}>
          <Loop
            data={UsTabProducts}
            renderItem={({item}) => (
              <FruityTiles
                item={item}
                UsGoToSingleProduct={UsGoToSingleProduct}
                // UsFavs={props.ourFavs}
                // UsRemoveFavAct={(i) => props.UsremoveFavAction(i)}
                // UsSetFavAct={(i) => props.UssetFavAction(i)}
              />
            )}
          />
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

const FruitifyTabs = ({item, Uscc, Usct}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.HomeTabsWrapper,
        backgroundColor:
          item.category === Uscc.category ? colors.primary : 'white',
      }}
      onPress={() => Usct(item)}>
      <Text
        style={{
          ...styles.HomeTabsText,
          color: item.category === Uscc.category ? 'white' : colors.primary,
        }}>
        {item.category}
      </Text>
    </TouchableOpacity>
  );
};

const FruityTiles = ({
  item,
  UsGoToSingleProduct,
  UsFavs,
  UsRemoveFavAct,
  UsSetFavAct,
}) => {
  useEffect(() => {
    // checkIfFav();
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
      style={{
        width: Measurements.width * 0.66,
        borderRadius: 18,
        marginLeft: Measurements.width * 0.05,
        height: Measurements.height * 0.55,
        elevation: 5,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          // ...border,
          borderRadius: 18,
          height: '100%',
          backgroundColor: 'rgba(255,123,34,0.9)',
          overflow: 'hidden',
          position: 'relative',
          paddingTop: Measurements.height * 0.035,
          paddingBottom: Measurements.height * 0.02,
          paddingHorizontal: Measurements.width * 0.03,
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'white',
            borderRadius: 50,
            opacity: 0.2,
            transform: [{scaleX: 4.5}, {scaleY: 4}],
            position: 'absolute',
            bottom: 0,
          }}
        />
        <View
          style={{
            ...border,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: Measurements.height * 0.015,
          }}>
          <Text
            style={{
              ...border,
              color: 'white',
              fontSize: Measurements.width * 0.06,
              fontWeight: 'bold',
              width: '75%',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              ...border,
              color: 'white',
              fontSize: Measurements.width * 0.05,
              // width: '75%',
            }}>
            $
            <Text
              style={{
                fontSize: Measurements.width * 0.065,
                fontWeight: 'bold',
              }}>
              {item.price}
            </Text>
          </Text>
        </View>
        <View style={{...border, flex: 1}}>
          <ImageBackground
            source={item.images}
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: Measurements.width * 0.12,
                height: Measurements.width * 0.12,
                borderRadius: 50,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 3,
              }}>
              <Ionicons
                name="ios-heart"
                color="red"
                size={Measurements.width * 0.06}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const border = {
  // borderColor: 'red',
  // borderWidth: 1,
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
  HomeTabsText: {
    fontWeight: '700',
    fontSize: Measurements.width * 0.047,
  },
  HomeTabsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Measurements.width * 0.04,
    width: Measurements.width * 0.2,
    height: Measurements.height * 0.1,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
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
