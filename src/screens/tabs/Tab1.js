import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { getPlants, signout } from '../../api/PlantsApi';
import { ListItem, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import {withNavigation} from 'react-navigation';

class PlantList extends React.Component {
  static navigationOptions = ({ navigation }) => {

  };

  state = {
    plantList: [],
    selectedIndex: 0
  }

  onPlantAdded = (plant) => {
    this.setState(prevState => ({
      plantList: [...prevState.plantList, plant]
    }));
    this.props.navigation.popToTop();
  }

  onPlantDeleted = () => {

    var newPlantList = [...this.state.plantList];
    newPlantList.splice(this.state.selectedIndex, 1);

    this.setState(prevState => ({
      plantList: prevState.plantList = newPlantList
    }));

    this.props.navigation.popToTop();
  }

  onPlantsReceived = (plantList) => {
    this.setState(prevState => ({
      plantList: prevState.plantList = plantList
    }));
  }

  componentDidMount() {
    getPlants(this.onPlantsReceived);
  }

  showActionButton = () =>
    <ActionButton
      buttonColor='blue'
      onPress={() => this.props.navigation.navigate('PlantFormScreen', { plantAddedCallback: this.onPlantAdded })}
    />

  render(navigation) {
    return this.state.plantList.length > 0 ?
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.plantList}
          ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ListItem
                containerStyle={styles.listItem}
                title={item.name}
                subtitle={`Category: ${item.category}`}
                titleStyle={styles.titleStyle}
                subtitleStyle={styles.subtitleStyle}
                leftAvatar={{
                  size: 'large',
                  rounded: false,
                  source: item.image && { uri: item.image }
                }}
                onPress={() => {
                  this.setState(prevState => ({ selectedIndex: prevState.selectedIndex = index }))
                  this.props.navigation.navigate('PlantDetailScreen', { plant: item, plantDeletedCallback: this.onPlantDeleted })
                }
                }

              />
            );
          }
          }
        />
        {this.showActionButton(navigation)}
      </SafeAreaView> :
      <View style={styles.textContainer}>
        <Text style={styles.emptyTitle}>No Plants found</Text>
        <Text style={styles.emptySubtitle}>Add a new plant using the + button below</Text>
        {this.showActionButton(navigation)}
      </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30
  },
  subtitleStyle: {
    fontSize: 18
  },
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic'
  }
});

export default withNavigation(PlantList);
