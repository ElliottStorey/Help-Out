import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      organization: '',
      description: '',
      address: '',
      email: '',
      skills: [],
      requirements: [],
      startDate: new Date(),
      startTime: new Date(),
      endDate: new Date(),
      endTime: new Date(),
    }
  }

  async postOpportunity() {
    const response = await fetch('https://VolunteerHub-API.elliottstorey2.repl.co/feed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });
    this.props.navigation.goBack();
  }

  render() {
    return(
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='always'>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Title</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter Opportunity Title'
            onChangeText={newText => this.setState({ title: newText })}
            defaultValue={this.state.title} 
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Organization Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter Organization Name'
            onChangeText={newText => this.setState({ organization: newText })}
            defaultValue={this.state.organization} 
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Description</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter Opportunity Description'
            onChangeText={newText => this.setState({ description: newText })}
            defaultValue={this.state.description} 
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Address</Text>
          <GooglePlacesAutocomplete
            placeholder='Enter Opportunity Address'
            onPress={data => this.setState({ address: data.description })}
            query={{key: 'AIzaSyBxt1CiV48Q07V6xWSUzQtF_HFG415LPpI'}}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter Contact Email'
            onChangeText={newText => this.setState({ email: newText })}
            defaultValue={this.state.email} 
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Skills</Text>
          {this.state.skills.map((skill, index) =>
            <TextInput
              style={styles.textInput}
              placeholder='Enter Suggested Skill'
              onChangeText={newText => {
                const newSkills = [...this.state.skills];
                newSkills[index] = newText;
                this.setState({ skills: newSkills });
              }}
              defaultValue={this.state.skills[index]}
            />
          )}
          <Button onPress={() => this.setState({ skills: [...this.state.skills, ''] })} title='+' />
        </View>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Requirements</Text>
          {this.state.requirements.map((requirements, index) =>
            <TextInput
              style={styles.textInput}
              placeholder='Enter Requirement'
              onChangeText={newText => {
                const newRequirements = [...this.state.requirements];
                newRequirements[index] = newText;
                this.setState({ requirements: newRequirements });
              }}
              defaultValue={this.state.requirements[index]}
            />
          )}
          <Button onPress={() => this.setState({ requirements: [...this.state.requirements, ''] })} title='+' />
        </View>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Start Date & Time</Text>
          <View style={styles.dateTime}>
            <DateTimePicker
              style={{ flex: 1 }}
              value={this.state.startDate}
              onChange={(event, selectedDate) => {
                this.setState({ startDate: selectedDate })
              }}
            />
            <DateTimePicker
              style={{ flex: 2 }}
              value={this.state.startTime}
              mode='time'
              onChange={(event, selectedTime) => {
                this.setState({ startTime: selectedTime })
              }}
            />
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.subtitle}>End Date & Time</Text>
          <View style={styles.dateTime}>
            <DateTimePicker
              style={{ flex: 1 }}
              value={this.state.endDate}
              onChange={(event, selectedDate) => {
                this.setState({ endDate: selectedDate })
              }}
            />
            <DateTimePicker
              style={{ flex: 2 }}
              value={this.state.endTime}
              mode='time'
              onChange={(event, selectedTime) => {
                this.setState({ endTime: selectedTime })
              }}
            />
          </View>
        </View>
        <View style={{ padding: 25 }}>
          <Button onPress={() => this.postOpportunity()} title='Post' />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  card: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    margin: 12,
  },
  textInput: {
    height: 30,
    borderBottomWidth: 1,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  dateTime: {
    flexDirection: 'row',
    marginVertical: 15,
  }
});