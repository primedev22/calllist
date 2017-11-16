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
    this.state = {callList: [], flagList: []}
  }

  componentDidMount() {
    fetch('http://s3.amazonaws.com/ppl.bz/contacts2.json')
    .then((response)=>response.json())
    .then((responseJson)=>{
      console.log(responseJson)
      var flagList = []
      for(var id in responseJson) {
        flagList.push( { "flag": 0 } )
      }
      this.setState( {callList: responseJson, flagList: flagList} )
    })
  }
  onCallButtonTapped( id ) {
    if( this.state.flagList[id].flag == 0 ) {
      RNImmediatePhoneCall.immediatePhoneCall(this.state.callList[id].number)
      var flagList = this.state.flagList
      
      flagList[id].flag = 1;
      //console.log( contractlist );
      this.setState({flagList: flagList})
    }else if( this.state.flagList[id].flag == 1 ) {
      var flagList = this.state.flagList
      this.refs["text"+id].slideOutRight(300).then(
        (endState) => {
          if(endState.finished) {
            flagList[id].flag = 2;
            this.setState({flagList: flagList})
          } 
        }
      )
    }
  }

  render() {
    var callListField = []
    var callList = this.state.callList
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

    for( var xx in callList ) {
      let id = xx
      //console.log(id, callList[id].name)
      if(this.state.flagList[id].flag != 2) {
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