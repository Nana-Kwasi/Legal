 import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './Authentication/Firebase/Register';
import LogIn from './Authentication/Firebase/Login';
import Home from './Pages/Home';
import Continue from './Pages/Continue';
import CivilianBottomNav from './Components/Civilian/CivilianBottomNav';
import LawyerBottomNav from './Components/Lawyers/LawyersBottomNav';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import 'react-native-get-random-values';
import LawyerRegistrationForm from './Components/Lawyers/LawyerRegistration';
import { CasesProvider } from './Components/Civilian/CaseContext';
import MyCases from './Components/Lawyers/MyCases';
import MyClients from './Components/Lawyers/MyClients';
import ProfileScreen from './Components/Lawyers/ProfileScreen';


const App = () => {

  const Starks = createStackNavigator();

  return (

    <Provider store={store}>
      <CasesProvider> 
    <NavigationContainer >
        <Starks.Navigator screenOptions={{header:()=>null, presentation:'transparentModal', animationTypeForReplace:'pop'}}>
            <Starks.Screen name='Home' component={Home} />
            <Starks.Screen name='Register' component={Register} />
            <Starks.Screen name='LogIn' component={LogIn} />
            <Starks.Screen name='Continue' component={Continue} />
            <Starks.Screen name='CivilianBottomNav' component={CivilianBottomNav} />
            <Starks.Screen name='LawyerBottomNav' component={LawyerBottomNav} />
            <Starks.Screen name='LawyerRegistration' component={LawyerRegistrationForm} />
            <Starks.Screen name='MyClients' component={MyClients} />
            <Starks.Screen name='MyCases' component={MyCases} />
            <Starks.Screen name='ProfileScreen' component={ProfileScreen} />


        </Starks.Navigator>
    </NavigationContainer>
    </CasesProvider>
    </Provider>
  );
};



export default App;