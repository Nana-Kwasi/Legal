// CasesTabNavigator.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LawyersMainFrame from './LawyersMainFrame';
import TakenCasesScreen from './TakenCasesScreen';




const Tab = createMaterialTopTabNavigator();

const CasesTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="New Cases" component={LawyersMainFrame} />
            <Tab.Screen name="Cases Taken" component={TakenCasesScreen} />
        </Tab.Navigator>
    );
};

export default CasesTabNavigator;
