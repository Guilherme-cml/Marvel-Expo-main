import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import QuadrinhosDetalhes from './QuadrinhosDetalhes'
import Quadrinhos from './Quadrinhos'

const Stack = createNativeStackNavigator()

const QuadrinhosStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="quadrinhos" component={Quadrinhos} options={{headerShown: false}} />
                <Stack.Screen name="quadrinhos-detalhes" component={QuadrinhosDetalhes} options={{headerShown: false}} />
            </Stack.Navigator>
        </>
    )
}

export default QuadrinhosStack