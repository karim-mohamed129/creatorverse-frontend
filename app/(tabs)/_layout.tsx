import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'explore',
};

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="explore" />
    </Stack>
  );
}
