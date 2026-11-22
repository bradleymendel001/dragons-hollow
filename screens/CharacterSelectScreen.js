import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CharacterCard from '../components/CharacterCard';
import { characters } from '../data/characters';

export default function CharacterSelectScreen({ navigation }) {
  const handleSelect = (character) => {
    navigation.navigate('NameEntry', { character });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Hero</Text>
      <ScrollView>
        {characters.map((c) => (
          <CharacterCard
            key={c.id}
            name={c.name}
            image={c.Image}
            hp={c.hp}
            attack={c.attack}
            description={c.description}
            onPress={() => handleSelect(c)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20, paddingTop: 60 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 16, textAlign: 'center' },
});
