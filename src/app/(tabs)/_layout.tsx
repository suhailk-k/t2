import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Colors } from '../../constants/colors';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface TabItem {
  name: string;
  label: string;
  icon: IoniconsName;
  iconActive: IoniconsName;
}

const TABS: TabItem[] = [
  { name: 'index', label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { name: 'my-learning', label: 'My Learning', icon: 'school-outline', iconActive: 'school' },
  { name: 'favourites', label: 'Favourites', icon: 'heart-outline', iconActive: 'heart' },
  { name: 'account', label: 'Account', icon: 'person-outline', iconActive: 'person' },
];



export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          height: Platform.OS === 'ios' ? 84 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? tab.iconActive : tab.icon}
                size={24}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
