/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {
  UsremoveFavAction,
  UssetFavAction,
  UssetCurrentProductAction,
} from '../UsReduxStore/UsActions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UseHeader from '../UsResuables/MyHeader';
import WrapperScreen from '../UsResuables/WrapperScreen';
import NavigationRef from '../UsResuables/RefNavigation';
import {NewArrivals} from './UsHome';
import {Measurements} from '../UsResuables/Measurement';
const UsFavourites = (props) => {
  const UsGoToSingleProduct = (item) => {
    props.UssetCurrentProductAction(item);
    NavigationRef.Navigate('UsSingleProduct');
  };

  const UsGoBack = () => NavigationRef.Navigate('UsHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <ScrollView bounces={false}>
        <UseHeader
          leftIcon={AntDesign}
          leftIconName="arrowleft"
          leftIconAction={UsGoBack}
          Title="Favourites"
        />
        <View style={styles.fav_SL1}>
          {props.ourFavs.length > 0 ? (
            props.ourFavs.map((item, index) => {
              return (
                <NewArrivals
                  key={item.id}
                  item={{...item}}
                  UsFavs={props.ourFavs}
                  UsRemoveFavAct={(i) => props.UsremoveFavAction(i)}
                  UsSetFavAct={(i) => props.UssetFavAction(i)}
                  UsGoToSingleProduct={UsGoToSingleProduct}
                />
              );
            })
          ) : (
            <Text style={styles.fav_SL2}>No Favourites...</Text>
          )}
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingHorizontal: Measurements.width * 0.027,
    paddingTop: Measurements.height * 0.025,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});

const mapStateToProps = (state) => {
  return {
    ourFavs: state.UsToggleFav,
  };
};

export default connect(mapStateToProps, {
  UssetFavAction,
  UssetCurrentProductAction,
  UsremoveFavAction,
})(UsFavourites);
