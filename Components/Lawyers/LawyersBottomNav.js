import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons'; 
import { Feather, FontAwesome5 } from '@expo/vector-icons'; 
import LawyerActivity from './LawyerActivity';
import LawyersMainFrame from './LawyersMainFrame';
import Dashboard from './Dashboard';
import Chat from './Chat';

const LawyerBottomNav = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: { backgroundColor: '#000', borderTopWidth: 0 },
            tabBarActiveTintColor: '#ffd700',
            tabBarInactiveTintColor: '#fff',
        }}>
            <Tab.Screen
                options={{ tabBarIcon: ({ color }) => <Feather name="home" size={25} color={color} /> }}
                name='Dashboard' component={Dashboard} />

            <Tab.Screen
                options={{ tabBarIcon: ({ color }) => <FontAwesome5 name="briefcase" size={25} color={color} /> }}
                name='LawyersMainFrame' component={LawyersMainFrame} />

            <Tab.Screen
                options={{ tabBarIcon: ({ color }) => <Feather name="activity" size={25} color={color} /> }}
                name='Activity' component={LawyerActivity} />

            <Tab.Screen
                options={{ tabBarIcon: ({ color }) => <Feather name="message-square" size={25} color={color} /> }}
                name='Chat' component={Chat} />
        </Tab.Navigator>
    );
}

export default LawyerBottomNav;
