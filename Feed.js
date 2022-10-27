import React from 'react';
import { FlatList, View, Text, Button, StyleSheet } from 'react-native';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: []
    };
  }

  async getFeed() {
    const response = await fetch('https://VolunteerHub-API.elliottstorey2.repl.co/feed');
    const feed = await response.json();
    this.setState({ feed: feed });
  }

  componentDidMount() {
    this.getFeed();
    this.props.navigation.addListener('focus', () => this.getFeed());
  }

  render() {
    return(
      <FlatList
        contentContainerStyle={styles.container}
        data={this.state.feed}
        renderItem={({item}) => 
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>Posted By {item.organization}</Text>
            <Text style={{fontWeight: 'bold'}}>{'\n'}⌛{new Date(item.startDate).toDateString()}</Text>
            <Text style={{fontWeight: 'bold'}}>{'\n'}📍{item.address}{'\n'}</Text>
            <Text>{item.description.slice(0, 100).concat('...')}</Text>
            <Button onPress={() => this.props.navigation.navigate('More', { opportunity: item })} title='More' />
          </View>
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    paddingHorizontal: 36,
    paddingVertical: 12,
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
  }
});