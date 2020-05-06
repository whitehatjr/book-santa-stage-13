import React, { Component } from "react";
import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import SantaAnimation from "../components/SantaClaus.js";
import db from "../config";
import firebase from "firebase";

import { Input, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

export default class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      confirmPassword: "",
      isModalVisible: "false",
    };
  }

  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            email_id: this.state.emailId,
            address: this.state.address,
            IsBookRequestActive: false,
          });
          return Alert.alert("User Added Successfully", "", [
            {
              text: "OK",
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate("DonateBooks");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.1 }} />
          <View
            style={{
              flex: 0.9,
              borderTopLeftRadius: RFValue(20),
              borderTopRightRadius: RFValue(20),
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                flex: 0.9,
                padding: RFValue(10),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginTop: RFValue(-20),
                }}
              >
                <Icon
                  type={"materialicon"}
                  name={"cancel"}
                  size={RFValue(40)}
                  color={"red"}
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}
                />
              </View>
              <Input
                style={styles.formInput}
                label={"First Name"}
                placeholder={"First Name"}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                  });
                }}
              />
              <Input
                style={styles.formInput}
                label={"Last Name"}
                placeholder={"Last Name"}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text,
                  });
                }}
              />
              <Input
                style={styles.formInput}
                label={"Contact"}
                placeholder={"Contact"}
                maxLength={10}
                keyboardType={"numeric"}
                onChangeText={(text) => {
                  this.setState({
                    contact: text,
                  });
                }}
              />
              <Input
                style={styles.formInput}
                label={"Address"}
                placeholder={"Address"}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    address: text,
                  });
                }}
              />
              <Input
                label={"Email"}
                style={styles.formInput}
                placeholder={"Email"}
                keyboardType={"email-address"}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
              />
              <Input
                label={"Password"}
                style={styles.formInput}
                placeholder={"Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />
              <Input
                label={"Confirm Password"}
                style={styles.formInput}
                placeholder={"Confrim Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
              />
            </View>
            <View
              style={{
                flex: 0.1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() =>
                  this.userSignUp(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  )
                }
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.1 }} />
          </View>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.showModal()}
        <View
          style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
        >
          {/*<SantaAnimation/>*/}
          <Text style={styles.title}>Book Santa</Text>
        </View>
        <View style={{ flex: 0.5 }}>
          <Input
            style={styles.loginBox}
            leftIcon={{
              type: "font-awesome",
              size: 25,
              name: "envelope",
              style: { paddingRight: 10 },
            }}
            placeholder="abc@example.com"
            placeholderTextColor="gray"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />
          <Input
            style={styles.loginBox}
            leftIcon={{
              type: "font-awesome5",
              size: 30,
              name: "keyboard",
              style: { paddingRight: 10 },
            }}
            secureTextEntry={true}
            placeholder="Enter Password"
            placeholderTextColor="gray"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          <TouchableOpacity
            style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
            onPress={() => {
              // this.userLogin(this.state.emailId, this.state.password);
              this.userLogin("abhi@example.com", "123456");
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ isModalVisible: true })}
          >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8BE85",
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 65,
    fontWeight: "300",
    paddingBottom: 30,
    color: "#ff3d00",
  },
  loginBox: {
    width: "80%",
    height: 40,
    padding: 10,
    borderBottomWidth: 1.5,
    borderColor: "#ff8a65",
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "#ff5722",
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    width: "73%",
    height: RFValue(40),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  registerButtonText: {
    color: "#ff5722",
    fontSize: 15,
    fontWeight: "bold",
  },
  cancelButton: {
    width: "80%",
    height: RFValue(30),
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: 300,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#ff9800",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,
  },
  buttonText: {
    color: "#ffff",
    fontWeight: "200",
    fontSize: 20,
  },
});
