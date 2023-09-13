import { logout } from '@store/reducers/user';
import { RootState, useAppDispatch } from '@store/store';
import { View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';


export default function Profile() {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const userStatus = useSelector((state: RootState) => state.user.status);

  const loading = userStatus === "loading";

  const signout = async () => {
    dispatch(logout());
  };

  return <>
    {loading &&
      <View style={{ flexGrow: 1, justifyContent: 'center' }}>
        <ActivityIndicator animating={loading} size='large' />
      </View>
    }

    {!loading &&
      <View style={{ padding: 12, flexGrow: 1 }}>


        <View style={{ flexGrow: 2 }}>
          <Text variant='labelMedium'>Email</Text>
          <Text variant='titleMedium'>{user?.name}</Text>
        </View>

        <Button
          icon='exit-to-app'
          textColor='#f44336'
          onPress={signout}>
          Logout
        </Button>
      </View>
    }
  </>

}