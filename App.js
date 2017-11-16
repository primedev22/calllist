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
import RNImmediatePhoneCall from 'react-native-immediate-phone-call'
import {BoxShadow} from 'react-native-shadow'
import * as Animatable from 'react-native-animatable';

export default class App extends Component<{}> {
  
  constructor(props) {
    super(props)
    /// flag is 0 if user haven't done call with that number yet
    /// flag is 1 if user have done call with that number 
    /// flag is 2 if user have remove button
    this.state = {
      callList: {
        "contactlist": [
            { "name":"Josh", "number":"332-443-2242", "flag": 0},
            { "name":"Jamie", "number":"222-232-2234", "flag": 0},
            { "name":"Nancy", "number":"678-332-2234", "flag": 0}
        ]
      }
    }
  }

  onCallButtonTapped( id ) {
    if( this.state.callList.contactlist[id].flag == 0 ) {
      RNImmediatePhoneCall.immediatePhoneCall(this.state.callList.contactlist[id].number)
      var contactlist = this.state.callList.contactlist
      
      contactlist[id].flag = 1;
      //console.log( contractlist );
      this.setState({callList: {contactlist: contactlist}})
    }else if( this.state.callList.contactlist[id].flag == 1 ) {
      var contactlist = this.state.callList.contactlist
      this.refs["text"+id].slideOutRight(300).then(
        (endState) => {
          if(endState.finished) {
            contactlist[id].flag = 2;
            this.setState({callList: {contactlist: contactlist}})
          } 
        }
      )
    }
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
      if(callList[id].flag != 2) {
        callListField.push(
          <Animatable.View ref={"text"+id} key={id} style={styles.callButtonContainer}>
            <BoxShadow setting={shadowOpt}>
              <TouchableOpacity style={styles.callButton} onPress={()=>this.onCallButtonTapped(id)}>
                <Text style={styles.callButtonText} >{callList[id].name + " | " + callList[id].number }</Text>
              </TouchableOpacity>
            </BoxShadow>
          </Animatable.View>
        )
      }
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