import { Pressable, Text, Image, StyleSheet } from 'react-native';

export default function CharacterCard({name, image, hp, attack, description, onPress}) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={image} style={styles.portrait} resizeMode="contain" />
      <Text style={styles.name}>{name} ⚔️ {attack}</Text>
      <Text style={styles.description}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {borderColor: '#2a2a3d', borderRadius: 12, padding: 16, marginVertical: 8, alignItems: 'center'},
  portrait: {width: 72, height: 72 },
  description: {color: '#888', fontSize: 12, marginTop: 4, textAlign: 'center'},
  name: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginTop: 4 },
  stat: { color: '#aaa', marginTop: 2 },
});
