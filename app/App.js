import { StackNavigator } from 'react-navigation';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Content from './components/Content';
import Home from './components/Home';

const Routes = StackNavigator({
  Home: { screen: Home },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  Content: { screen: Content }
}, {
  initialRouteName: 'Home'
});

export default Routes;