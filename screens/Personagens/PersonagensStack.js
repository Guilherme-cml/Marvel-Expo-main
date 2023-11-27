import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Personagens from './Personagens'
import PersonagensDetalhes from './PersonagensDetalhes'

const Stack = createNativeStackNavigator()

const PersonagensStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="personagens" component={Personagens} options={{headerShown: false}} />
                <Stack.Screen name="personagens-detalhes" component={PersonagensDetalhes} options={{headerShown: false}} />
            </Stack.Navigator>
        </>
    )
}

export default PersonagensStack