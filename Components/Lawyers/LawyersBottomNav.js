import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import LawyerActivity from './LawyerActivity';
import LawyersMainFrame from './LawyersMainFrame';

const LawyerBottomNav = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator headerMode='none' screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: '#243035',
            header: ()=>null
        }}>
            <Tab.Screen
            options={{tabBarInactiveBackgroundColor:'#cfcfcf',tabBarIcon:()=><Octicons name="feed-discussion" size={25} color='white' />}}
            name='LawyersMainFrame' component={LawyersMainFrame} />

            <Tab.Screen
            options={{tabBarInactiveBackgroundColor: '#cfcfcf',tabBarIcon:()=><Feather name="activity" size={25} color='white'/>}}
            name='Activity' component={LawyerActivity} />
        </Tab.Navigator>
    );
}



export default LawyerBottomNav;

