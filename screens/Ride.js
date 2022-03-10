import React, { Component } from "react";
import { View, Text,TouchableOpacity,StyleSheet } from "react-native";
import * as Permissions from "expo-permissions"
import { BarCodeScanner } from "expo-barcode-scanner";
import { askAsync } from "expo-permissions";

export default class TransactionScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      domState:"normal",
      hasCameraPermission:null,
      scan:false,
      scanData:"",
    }
}
  getCameraPermissions= async domState=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission : status === "granted",
      domState:domState,
      scan:false,
    })
  }
  handleBarCodeScan=async({type,data})=>{
    this.setState({
      scanData:data,
      domState:"normal",
      scan:true,
    })
  }
  render() {
    const {domState,hasCameraPermission,scanData,scan}= this.state
    if (domState == "scanner"){
      return(
        <BarCodeScanner onBarCodeScanned={scan?undefined:this.handleBarCodeScan} style={StyleSheet.absoluteFillObject}/>
      );
    }
    return (
      <View style={styles.container}>
        <Text>
          {hasCameraPermission?scanData:"Request For Camera Permissions"}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.getCameraPermissions("scanner")}
        >
          <Text style={styles.text}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  button:{
    width:"50%",
    height:50,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"green",
    borderRadius:50
  },
});