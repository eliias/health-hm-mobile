import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import {AppRegistry, ScrollView, ListView, Text} from 'react-native'
import AppleHealthKit from 'react-native-apple-healthkit'

const healthKitOptions = {
  permissions: {
    read: [
      'DateOfBirth',
      'BiologicalSex',
      'Height',
      'Weight',
      'BodyFatPercentage',
      'BodyMassIndex',
      'StepCount',
      'DistanceWalkingRunning',
      'DistanceCycling',
      'BasalEnergyBurned',
      'ActiveEnergyBurned',
      'FlightsClimbed',
      'HeartRate'
    ],
    write: []
  }
}

class Stats extends Component {
  componentDidMount() {
    AppleHealthKit.initHealthKit(healthKitOptions, err => {
      if (err) {
        return console.error('error initializing healthkit: ', err)
      }

      AppleHealthKit.getLatestWeight({unit: 'gram'}, (err, weight) => {
        if (err) {
          return console.error('error getting latest weight: ', err)
        }
        this.props.actions.addStat('weight', Number(weight.value / 1000).toFixed(1))
      })

      AppleHealthKit.getLatestHeight({unit: 'meter'}, (err, height) => {
        if (err) {
          return console.error('error getting latest height: ', err)
        }
        this.props.actions.addStat('height', height.value)
      })
    })
  }

  render() {
    const {stats} = this.props
    const ds = new ListView.DataSource({rowHasChanged: (r1, rs) => r1.name !== r2.name})
    this.state = {
      dataSource: ds.cloneWithRows(_.map(stats, (value, name) => {
        return {
          name,
          value
        }
      }))
    }

    return (
      <ScrollView style={styles.list}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={data => <Text>{data.name} {data.value}</Text>}
        />
      </ScrollView>
    )
  }
}

Stats.propTypes = {
  stats: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const styles = {
  list: {
    marginTop: 20
  }
}

export default Stats