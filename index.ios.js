import React, {Component} from 'react'
import {AppRegistry} from 'react-native'
import {Provider} from 'react-redux'
import App from './app/containers/app'
import configureStore from './app/store/index'

const store = configureStore()

class Health extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('mobile', () => Health)
