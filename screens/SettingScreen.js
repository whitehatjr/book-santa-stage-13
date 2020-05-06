import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Input } from "react-native-elements";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class SettingScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      docId: "",
    };
  }

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection("users")
      .where("email_id", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailId: data.email_id,
            firstName: data.first_name,
            lastName: data.last_name,
            address: data.address,
            contact: data.contact,
            docId: doc.id,
          });
        });
      });
  };

  updateUserDetails = () => {
    db.collection("users").doc(this.state.docId).update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      address: this.state.address,
      contact: this.state.contact,
    });

    Alert.alert("Profile Updated Successfully");
  };

  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <MyHeader title="Settings" navigation={this.props.navigation} />
        </View>
        <View style={{ flex: 0.9 }}>
          <View
            style={{
              flex: 0.5,
              padding: RFValue(10),
            }}
          >
            <Input
              style={styles.formTextInput}
              placeholder={"First Name"}
              label={"First Name"}
              maxLength={8}
              containerStyle={{
                marginBottom: RFValue(25),
                marginTop: RFValue(30),
              }}
              onChangeText={(text) => {
                this.setState({
                  firstName: text,
                });
              }}
              value={this.state.firstName}
            />
            <Input
              style={styles.formTextInput}
              label={"Last Name"}
              placeholder={"Last Name"}
              maxLength={8}
              containerStyle={{ marginBottom: RFValue(25) }}
              onChangeText={(text) => {
                this.setState({
                  lastName: text,
                });
              }}
              value={this.state.lastName}
            />
            <Input
              style={styles.formTextInput}
              label={"Contact"}
              placeholder={"Contact"}
              maxLength={10}
              containerStyle={{ marginBottom: RFValue(25) }}
              keyboardType={"numeric"}
              onChangeText={(text) => {
                this.setState({
                  contact: text,
                });
              }}
              value={this.state.contact}
            />
            <Input
              style={styles.formTextInput}
              label={"Address"}
              placeholder={"Address"}
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  address: text,
                });
              }}
              value={this.state.address}
            />
          </View>
          <View style={{ flex: 0.5, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateUserDetails();
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  formTextInput: {
    width: "75%",
    height: RFValue(35),
    padding: RFValue(10),
  },
  button: {
    width: "75%",
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(50),
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(20),
  },
  buttonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
});
