import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, 
  TouchableOpacity, View } from 'react-native';
import firebase from 'firebase';
import { loginStyles } from '../styles/LoginStyles';
import { getDataStore } from '../data/DataStore';

export function LoginScreen (props) {

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  const dataStore = getDataStore();

  function FocusableTextInput(props) {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState(props.value);
    const parentValueUpdate = props.parentValueUpdate;
    const placeholder = props.placeholder;
    const autoFocus = props.autoFocus;

    return (
      <TextInput
        style={isFocused ? 
          loginStyles.focusedInputBox : 
          loginStyles.inputBox }
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        autoCapitalize='none'
        onFocus={()=>{setIsFocused(true)}}
        onBlur={()=>{setIsFocused(false)}}
        onChangeText={text=>{
          setValue(text);
          parentValueUpdate(text);          
        }}
      />
    );
  }

  function SignupForm (props) {

    return(
      <View style={loginStyles.container}>
        <View style={loginStyles.body}>
          <FocusableTextInput
            placeholder='Email'
            value={email}
            parentValueUpdate={setEmail}
            autoFocus={true}
          />
          <FocusableTextInput
            placeholder='Display Name'
            value={displayName}
            parentValueUpdate={setDisplayName}
          />
          <FocusableTextInput
            placeholder='Password'
            value={pass1}
            parentValueUpdate={setPass1}
          />
          <FocusableTextInput
            placeholder='Repeat Password'
            value={pass2}
            parentValueUpdate={setPass2}
          />
          <Text>Already have an account? {' '}
            <Text 
              style={{textDecorationLine: 'underline'}}
              onPress={()=>setMode('login')}>Sign In.
            </Text>
          </Text>
        </View>
        <View style={loginStyles.footer}>
          <TouchableOpacity
            style={loginStyles.mainActionButton}
            onPress={()=>{
              firebase.auth().createUserWithEmailAndPassword(email, pass1)
                .then((user) => {
                  user.user.updateProfile({
                    displayName: displayName
                  });
                })
                .catch((error) => {
                  Alert.alert(
                    'Can\'t create account', error.message,
                    [{ text: 'OK', style: 'OK'},]
                  );
                });
              }
            }
          >
            <Text style={loginStyles.mainActionButtonText}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function LoginForm (props) {
    return(
      <View style={loginStyles.container}>
        <View style={loginStyles.body}>
          <FocusableTextInput
            placeholder='Email'
            value={email}
            parentValueUpdate={setEmail}
            autoFocus={true}
          />
          <FocusableTextInput
            placeholder='Password'
            value={pass1}
            parentValueUpdate={setPass1}
          />
          <Text>Don't have an account?  {' '}
            <Text 
              style={{textDecorationLine: 'underline'}}
              onPress={()=>setMode('create')}>Create one.
            </Text>
          </Text>
        </View>
        <View style={loginStyles.footer}>
          <TouchableOpacity
            style={loginStyles.mainActionButton}
            onPress={()=>{
              firebase.auth().signInWithEmailAndPassword(email, pass1)
                .then((user) => {
                  console.log(email, 'logged in');
                })
                .catch((error) => {
                  console.log(error);
                });          
              }
            }
          >
            <Text style={loginStyles.mainActionButtonText}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let dName = user.displayName;
        if (!dName && displayName) {
          dName = displayName;
        }
        const currentUser = {
          displayName: dName,
          id: user.uid
        };
        dataStore.setCurrentUser(currentUser);
        props.navigation.navigate('MainTabs');
      } else {
        console.log('user signed out');
      }
    });
  });

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.header}></View>
      {mode === 'login' ?
        <LoginForm /> : <SignupForm/>
      }
    </View>
  );
}
