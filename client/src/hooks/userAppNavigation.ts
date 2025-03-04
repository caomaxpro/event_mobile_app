import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '@src/navigation/MainNavigator';
import { DrawerParamList } from '@src/navigation/DrawerNavigator';
import { TabParamList } from '@src/navigation/TabNavigator';
import { AuthStackParamList } from '@src/navigation/AuthNavigator';

// Hook để tự động xác định navigation phù hợp
export const useAppNavigation = () => {
  const stackNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const drawerNavigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const tabNavigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const authNavigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return { stackNavigation, drawerNavigation, tabNavigation, authNavigation };
};
