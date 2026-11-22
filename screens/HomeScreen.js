import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dragon's Hollow</Text>
      <Text style={styles.subtitle}>A "perfect sized" turn-based RPG</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('CharacterSelect')}>
        <Text style={styles.buttonText}>Start Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 32, fontWeight: 'bold', color: '#fff'},
  subtitle: {color: '#aaa', marginTop: 8, marginBottom: 40},
  button: {backgroundColor: '#e94560', paddingVertical: 14, paddingHorizontal: 36, borderRadius: 30},
  buttonText: {color: '#fff', fontSize: 18, fontWeight: '600'},
});
