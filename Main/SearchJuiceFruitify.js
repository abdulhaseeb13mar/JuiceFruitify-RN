/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WrapperScreen from '../UsResuables/WrapperScreen';
import {Measurements} from '../UsResuables/Measurement';
import NavigationRef from '../UsResuables/RefNavigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchBar from '../UsResuables/searchingBar';
import Data from '../UsDummyData';
import {NewArrivals} from './UsHome';
import {connect} from 'react-redux';
import {
  UssetCurrentProductAction,
  UsremoveFavAction,
  UssetFavAction,
} from '../UsReduxStore/UsActions';
import UseHeader from '../UsResuables/MyHeader';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        No Lamp Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const UsGoToSingleProduct = (item) => {
    props.UssetCurrentProductAction(item);
    NavigationRef.Navigate('UsSingleProduct');
  };

  const CardRender = (Arr) => {
    return Arr.map((item) => (
      <NewArrivals
        key={item.id}
        item={{...item}}
        UsGoToSingleProduct={UsGoToSingleProduct}
        UsFavs={props.ourFavs}
        UsRemoveFavAct={(i) => props.UsremoveFavAction(i)}
        UsSetFavAct={(i) => props.UssetFavAction(i)}
      />
    ));
  };
  const UsGoBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={AntDesign}
        Title="All Lamps"
        leftIconName="arrowleft"
        leftIconAction={UsGoBack}
      />
      <View style={styles.SearchBarWrapper}>
        <SearchBar changeSearchText={changeSearchText} />
      </View>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={{marginTop: Measurements.height * 0.03}}>
          {searchText !== ''
            ? RenderSearchedResult()
            : CardRender(Data.product)}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  ourFavs: state.UsToggleFav,
});

export default connect(mapStateToProps, {
  UssetCurrentProductAction,
  UsremoveFavAction,
  UssetFavAction,
})(Search);

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: Measurements.width * 0.03,
    paddingVertical: Measurements.height * 0.018,
  },
  TilesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  SearchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Measurements.height * 0.003,
  },
  container: {flex: 1},
});
