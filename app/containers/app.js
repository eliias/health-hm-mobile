import React, {Component, PropTypes} from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Stats from '../components/stats'
import * as StatsActions from '../actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

class App extends Component {
  render() {
    const {stats, actions} = this.props
    return (
      <Stats stats={stats} actions={actions}/>
    )
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    stats: state.stats
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(StatsActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)