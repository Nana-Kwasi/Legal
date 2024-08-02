import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; // Add a new icon library
import CivilianActivity from './CivilianActivity';
import PenComponent from './PenComponent';
import ReadComponent from './ReadComponent ';
import Chats from './Chats';




const CivilianBottomNav = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: '#243035',
                tabBarInactiveBackgroundColor: '#cfcfcf',
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'MainFrame') {
                        iconName = 'feed-discussion';
                        return <Octicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Pen') {
                        iconName = 'pencil';
                        return <EvilIcons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Activity') {
                        iconName = 'activity';
                        return <Feather name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Read') {
                        iconName = 'library-books';
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    }
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'black',
                header: () => null
            })}
        >
            
            <Tab.Screen
                name='Pen'
                component={PenComponent}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <EvilIcons name="pencil" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name='Activity'
                component={CivilianActivity}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="activity" size={size} color={color} />
                    ),
                }}
            />
                        <Tab.Screen
                options={{ tabBarIcon: ({ color }) => <Feather name="message-square" size={25} color={color} /> }}
                name='Chats' component={Chats} />

            <Tab.Screen
                name='Read'
                component={ReadComponent}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="library-books" size={size} color={color} />
                    ),
                }}
            />
            
        </Tab.Navigator>
    );
}

export default CivilianBottomNav;
