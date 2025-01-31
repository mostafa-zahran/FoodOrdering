import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '../providers/authProvider';
import { supabase } from '../lib/supabase';

const index = () => {
  const { session, loading, profile, isAdmin } = useAuth();
  if (loading)  { return <ActivityIndicator />; }
  if (!session) {
    return (
      <Redirect href="/(auth)?new_user=false" />
    );
  }
  if (profile && !isAdmin) {
    return (
      <Redirect href="/(user)" />
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Button text="Logout" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default index;