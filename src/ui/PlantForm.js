import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button
} from 'react-native';
import GridList from '../ui/GridList';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { addPlant, updatePlant, uploadPlant } from '../api/PlantsApi';
import GrowImagePicker from '../ui/GrowImagePicker';

const PlantForm = (props) => {

  setPlantImage = (image) => {
    props.setFieldValue('imageUri', image.uri);
  }

  return (
    <View style={styles.container}>
      <GrowImagePicker image={props.plant.image} onImagePicked={setPlantImage} />
      <TextInput
        value={props.values.name}
        style={styles.longFormInput}
        placeholder='Name'
        onChangeText={text => { props.setFieldValue('name', text) }}
      />
      <Text style={styles.validationText}> {props.errors.name}</Text>
      <TextInput
        value={props.values.category}
        style={styles.longFormInput}
        placeholder='Category'
        onChangeText={text => { props.setFieldValue('category', text) }}
      />
      <Text style={styles.validationText}> {props.errors.category}</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.formInput}
          onChangeText={text => { props.setSubIngredients(text) }}
          placeholder='Sub-ingredient'
        />
        <Button
          style={styles.button}
          title='Add'
          onPress={() => { props.submitSubIngredients() }} />
      </View>
      <GridList
        items={props.plant.subIngredients} />
      <Button
        title='Submit'
        onPress={() => props.handleSubmit()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32
  },
  container: {
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  formInput: {
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    height: 50,
    color: 'black',
    width: '75%',
    marginBottom: 16,
    marginTop: 16
  },
  validationText: {
    color: 'red'
  },
  longFormInput: {
    width: '100%',
    height: 50,
    color: 'black',
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    margin: 16
  },
});

export default withFormik({
  mapPropsToValues: ({ plant }) => ({
    name: plant.name,
    category: plant.category,
    imageUri: null
  }),
  enableReinitialize: true,
  validationSchema: (props) => yup.object().shape({
    name: yup.string().max(30).required(),
    category: yup.string().max(15).required()
  }),
  handleSubmit: (values, { props }) => {
    console.log(props);

    values.subIngredients = props.plant.subIngredients;

    console.log(values);

    if (props.plant.id) {
      values.id = props.plant.id;
      values.createdAt = props.plant.createdAt;
      values.image = props.plant.image;
      uploadPlant(values, props.onPlantUpdated, { updating: true });
    } else {
      uploadPlant(values, props.onPlantAdded, { updating: false });
    }
  },
})(PlantForm);
