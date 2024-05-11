import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import CivilianActivity from './CivilianActivity';
import PenComponent from './PenComponent';
import MainFrame from '../MainFrame'

const CivilianBottomNav = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator headerMode='none' screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: '#243035',
            header: ()=>null
        }}>
            {/* <Tab.Screen
            options={{tabBarInactiveBackgroundColor:'#cfcfcf',tabBarIcon:()=><Octicons name="feed-discussion" size={25} color='white' />}}
            name='MainFrame' component={MainFrame} /> */}

            <Tab.Screen
            options={{tabBarInactiveBackgroundColor:'#cfcfcf',tabBarIcon:()=><EvilIcons name="pencil" size={25} color="white" />}}
            name='Pen' component={PenComponent} />

            <Tab.Screen
            options={{tabBarInactiveBackgroundColor: '#cfcfcf',tabBarIcon:()=><Feather name="activity" size={25} color='white'/>}}
            name='Activity' component={CivilianActivity} />
        </Tab.Navigator>
    );
}



export default CivilianBottomNav;
