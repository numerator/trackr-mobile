import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, 
  TouchableOpacity, View } from 'react-native';
import firebase from 'firebase';
import { loginStyles } from '../styles/LoginStyles';
import { getDataStore } from '../data/DataStore';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);


function FocusableTextInput(props) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const parentValueUpdate = props.parentValueUpdate;
  const placeholder = props.placeholder;
  const autoFocus = props.autoFocus;
  const secure = props.secure;
  const type= props.type;
  console.log("rendering FTI, props:", props, "value:", value);

  return (
    <TextInput
      style={isFocused ? 
        loginStyles.focusedInputBox : 
        loginStyles.inputBox }
      placeholder={placeholder}
      value={value}
      onFocus={()=>setIsFocused(true)}
      onBlur={()=>setIsFocused(false)}
      autoFocus={autoFocus}
      secureTextEntry={secure}
      textContentType={type}
      autoCapitalize='none'
      onChangeText={text=>{
        setValue(text);
        parentValueUpdate(text);          
      }}
    />
  );
}

function LoginForm (props) {
  let {email, setEmail, pass1, setPass1, setMode} = props;
  console.log("rendering LoginForm, props:", props);
  return(
    <View style={loginStyles.container}>
      <View style={loginStyles.body}>
        <FocusableTextInput
          placeholder='Email'
          value={email}
          parentValueUpdate={setEmail}
          autoFocus={true}
          type='emailAddress'
        />
        <FocusableTextInput
          placeholder='Password'
          value={pass1}
          parentValueUpdate={setPass1}
          secure={true}
          type='password'
        />
        <Text style={loginStyles.modeSwitchLabel}>Don't have an account? {' '}
          <Text 
            style={loginStyles.hyperlink}
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
                setEmail('');
                setPass1('');
                console.log(email, 'logged in');
              })
              .catch((error) => {
                Alert.alert(
                  'Can\'t sign in', error.message,
                  [{ text: 'OK', style: 'OK'},]
                );              
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

function SignupForm (props) {

  let {email, setEmail, displayName, setDisplayName, 
      pass1, setPass1, pass2, setPass2, setMode} = props;

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
        <Text style={loginStyles.modeSwitchLabel}>Already have an account? {' '}
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
                setEmail('');
                setDisplayName('');
                setPass1('');
                setPass2('');
                console.log(email, 'created user');
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

export function LoginScreen (props) {

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  const dataStore = getDataStore();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {      
        console.log('user is signed in', user.email);
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
        //props.navigation.navigate('SignIn');
        console.log('user is signed out')
      }
      console.log('resetting all of the state variables now');
      setEmail('');
      setDisplayName('');
      setPass1('');
      setPass2('');
    });
  }, []);

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.header}></View>
      {mode === 'login' ?
        <LoginForm
          email={email}
          setEmail={setEmail}
          pass1={pass1}
          setPass1={setPass1}
          setMode={setMode}
        /> 
        : 
        <SignupForm
          email={email}
          setEmail={setEmail}
          displayName={displayName}
          setDisplayName={setDisplayName}
          pass1={pass1}
          setPass1={setPass1}
          pass2={pass2}
          setPass2={setPass2}
          setMode={setMode}
        />
      }
    </View>
  );
}
