import React from 'react';
import { View, ScrollView, Text, StyleSheet, Alert, Button } from 'react-native';
import MapView from 'react-native-maps';

export default class More extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opportunity: this.props.route.params.opportunity,
      latitude: 34.7304,
      longitude: -86.5861,
    };
  }

  componentDidMount() {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.opportunity.address}&key=AIzaSyBxt1CiV48Q07V6xWSUzQtF_HFG415LPpI`)
    .then(res => res.json())
    .then(res => {
      const latitude = res.results[0].geometry.location.lat;
      const longitude = res.results[0].geometry.location.lng;
      this.setState({
        latitude: latitude,
        longitude: longitude
      });
    });
  }
  
  render() {
    return(
      <React.Fragment>
        <View style={[styles.card, {borderRadius:12}]}>
          <MapView
            style={styles.map}
            mapType='mutedStandard'
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              title={this.state.opportunity.organization}
              description={this.state.opportunity.address}
            />
          </MapView>
        </View>
        <ScrollView style={styles.card}>
          <Text style={styles.title}>{this.state.opportunity.title}</Text>
          <Text style={styles.subtitle}>Posted By {this.state.opportunity.organization}</Text>
          <Text style={{fontWeight: 'bold'}}>{'\n'}Description</Text>
          <Text>{this.state.opportunity.description}</Text>
          <Text style={{fontWeight: 'bold'}}>{'\n'}Address</Text>
          <Text>{this.state.opportunity.address}</Text>
          <Text style={{fontWeight: 'bold'}}>{'\n'}Contact Email</Text>
          <Text>{this.state.opportunity.email}</Text>
          <Text style={{fontWeight: 'bold'}}>{'\n'}Skills</Text>
          {this.state.opportunity.skills.map(skill => <Text>{skill}</Text>)}
          <Text style={{fontWeight: 'bold'}}>{'\n'}Requirements</Text>
          {this.state.opportunity.requirements.map(requirement => <Text>{requirement}</Text>)}
          <Text style={{fontWeight: 'bold'}}>{'\n'}Start Date & Time</Text>
          <Text>{new Date(this.state.opportunity.startDate).toDateString()},</Text>
          <Text>{new Date(this.state.opportunity.startTime).toLocaleTimeString([], {hour: 'numeric', minute:'numeric'})}</Text>
          <Text style={{fontWeight: 'bold'}}>{'\n'}End Date & Time</Text>
          <Text>{new Date(this.state.opportunity.endDate).toDateString()},</Text>
          <Text>{new Date(this.state.opportunity.endTime).toLocaleTimeString([], {hour: 'numeric', minute:'numeric'})}{'\n\n'}</Text>
        </ScrollView>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    flex: 1,
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  map: {
    flex: 1,
  },
});