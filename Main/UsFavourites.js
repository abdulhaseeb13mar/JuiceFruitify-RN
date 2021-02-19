/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {
  UsremoveFavAction,
  UssetFavAction,
  UssetCurrentProductAction,
} from '../UsReduxStore/UsActions';
import Entypo from 'react-native-vector-icons/Entypo';
import UseHeader from '../UsResuables/MyHeader';
import WrapperScreen from '../UsResuables/WrapperScreen';
import NavigationRef from '../UsResuables/RefNavigation';
import Loop from '../UsResuables/looping';
import {FruityTiles} from './UsHome';
import {Measurements} from '../UsResuables/Measurement';
const UsFavourites = (props) => {
  const UsGoToSingleProduct = (item) => {
    props.UssetCurrentProductAction(item);
    NavigationRef.Navigate('UsSingleProduct');
  };

  const UsGoBack = () => NavigationRef.Navigate('UsHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        leftIconAction={UsGoBack}
        Title="Favourites"
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: Measurements.width * 0.05,
          fontWeight: 'bold',
          marginTop: Measurements.height * 0.08,
        }}>
        You have {props.UsFavs.length} Favourite items
      </Text>
      <ScrollView bounces={false}>
        <View style={styles.fav_SL1}>
          <Loop
            data={props.UsFavs}
            renderItem={({item}) => (
              <FruityTiles
                item={item}
                UsGoToSingleProduct={UsGoToSingleProduct}
                UsFavs={props.UsFavs}
                UsRemoveFavAct={(i) => props.UsremoveFavAction(i)}
                UsSetFavAct={(i) => props.UssetFavAction(i)}
              />
            )}
          />
        </View>
      </ScrollView>
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  fav_SL2: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  fav_SL1: {
    flex: 1,
    paddingLeft: Measurements.width * 0.027,
    paddingTop: Measurements.height * 0.025,
  },
});

const mapStateToProps = (state) => {
  return {
    UsFavs: state.UsToggleFav,
  };
};

export default connect(mapStateToProps, {
  UssetFavAction,
  UssetCurrentProductAction,
  UsremoveFavAction,
})(UsFavourites);
