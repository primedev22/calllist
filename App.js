/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import Communications from 'react-native-communications'
import {BoxShadow} from 'react-native-shadow'

export default class App extends Component<{}> {
  
  constructor(props) {
    super(props)
    
    this.state = {
      callList: {
        "contactlist": [
            { "name":"Josh", "number":"332-443-2242" },
            { "name":"Jamie", "number":"222-232-2234" },
            { "name":"Nancy", "number":"678-332-2234" }
        ]
      }
    }
  }

  onCallButtonTapped( id ) {
    Communications.phonecall(this.state.callList.contactlist[id].number, false)
    contactlist = this.state.callList.contactlist
    contactlist.splice(id, 1)
    setTimeout(()=>{this.setState({callList: {contactlist: contactlist}})}, 100)
  }

  render() {
    var callListField = []
    var callList = this.state.callList.contactlist
    const shadowOpt = {
      width: responsiveWidth(100)-60,
      height: 60,
      color: '#000',
      border: 2,
      radius: 3,
      opacity: 0.5,
      x: 0, 
      y: 3,
      style: { marginVertical: 5 }
    }
    for( xx in callList ) {
      let id = xx
      //console.log(id, callList[id].name)
      callListField.push(
        <View key={id} style={styles.callButtonContainer}>
          <BoxShadow setting={shadowOpt}>
            <TouchableOpacity style={styles.callButton} onPress={()=>this.onCallButtonTapped(id)}>
              <Text style={styles.callButtonText} >{callList[id].name + " | " + callList[id].number }</Text>
            </TouchableOpacity>
          </BoxShadow>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {callListField}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
  },
  callButtonContainer: {
    width: responsiveWidth(100)-60,
    height: 60,
    marginTop: 40
  },
  callButton: {
    width: responsiveWidth(100)-60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 3,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  callButtonText: {
    fontSize: 20,
  }
});