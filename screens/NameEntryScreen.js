import { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import ActionButton from '../components/ActionButton';

export default function NameEntryScreen({ route, navigation }) {
    const { character } = route.params;
    const [name, setName] = useState('');

    const handleConfirm = () => {
        const finalName = name.trim() || character.name;
        navigation.navigate('StatAllocation', { character, heroName: finalName });
    };

    return (
        <View style={styles.container}>
            <Image source={character.Image} style={styles.portrait} resizeMode="contain" />
            <Text style={styles.label}>Name your {character.name}</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder= "Enter a name" placeholderTextColor='#777' maxLength={16} />
            <ActionButton label="Begin Adventure" color="#e94560" onPress={handleConfirm} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center', padding: 20},
    portrait: {width: 100, height: 100, marginBottom: 16},
    label: {color: '#fff', fontSize: 20, marginBottom: 16 },
    input: {width: '100%', backgroundColor: '#2a2a3d', color: '#fff', borderRadius: 10, padding: 12, marginBottom: 20, textAlign: 'center'}
})
