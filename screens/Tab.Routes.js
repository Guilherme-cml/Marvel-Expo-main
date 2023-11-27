import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PersonagensStack from './Personagens/PersonagensStack';
import QuadrinhosStack from './Quadrinhos/QuadrinhosStack';
import Quiz from './Quiz/Quiz';


const Tab = createBottomTabNavigator();


export default function TabRoutes() {
    return (
        <Tab.Navigator
            initialRouteName='Home'         
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'black',
                    borderTopColor: 'black',  
                }        
            }}         
        >

            <Tab.Screen
                name="Personagens"  
                component={PersonagensStack}
                options={{ 
                    tabBarIcon: () =>
                    (
                        <MaterialCommunityIcons name="format-align-left" color="white" size={26} />
                      ), 
                }}
            />
                <Tab.Screen
                    name="Quadrinhos"
                    component={QuadrinhosStack}
                    options={{
                        tabBarIcon: () =>  (
                            <MaterialCommunityIcons name="book-open-page-variant" color="white" size={26} />
                          ),
                    }}
                />

                <Tab.Screen
                    name="Quiz"
                    component={Quiz}
                    options={{
                        tabBarIcon: () =>  (
                            <MaterialCommunityIcons name="comment-question" color="white" size={26} />
                          ),
                    }}
                />



        </Tab.Navigator>
    )
}