import { logoutFromAuth } from '@services/supabase';
import { logout } from '@store/reducers/user';
import { RootState } from '@store/store';
import { useState } from 'react';
import { Alert, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';


export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [loading, setLoading] = useState(false);

  const signout = async () => {
    setLoading(true);

    const { error } = await logoutFromAuth();
    if (error) {
      Alert.alert('Logout Error', error.message);
      setLoading(false);
      return;
    }

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