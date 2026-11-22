import { useReducer } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ActionButton from '../components/ActionButton';
import {statAllocationReducer, initialStatAllocationState, getAllocatedStats} from '../reducers/statAllocationReducer';

export default function StatAllocationScreen({ route, navigation }) {
  const { character, heroName } = route.params;

  const [allocation, dispatch] = useReducer(
    statAllocationReducer,
    initialStatAllocationState(character)
  );

  const { hp, attack } = getAllocatedStats(allocation);

  const handleConfirm = () => {
    const boostedCharacter = { ...character, hp, attack };
    navigation.navigate('Game', { character: boostedCharacter, heroName });
  };

  return (
    <View style={styles.container}>
      <Image source={character.Image} style={styles.portrait} resizeMode="contain" />
      <Text style={styles.heading}>Assign {heroName}'s Bonus Stats</Text>
      <Text style={styles.pointsRemaining}>Points Remaining: {allocation.pointsRemaining}</Text>

      <StatRow
        label="HP"
        value={hp}
        onIncrease={() => dispatch({ type: 'ADD_HP' })}
        onDecrease={() => dispatch({ type: 'REMOVE_HP' })}
        canIncrease={allocation.pointsRemaining > 0}
        canDecrease={allocation.hpPoints > 0}
      />
      <StatRow
        label="Attack"
        value={attack}
        onIncrease={() => dispatch({ type: 'ADD_ATTACK' })}
        onDecrease={() => dispatch({ type: 'REMOVE_ATTACK' })}
        canIncrease={allocation.pointsRemaining > 0}
        canDecrease={allocation.attackPoints > 0}
      />

      <ActionButton label="Confirm & Start Battle" color="#e94560" onPress={handleConfirm} />
    </View>
  );
}

function StatRow({ label, value, onIncrease, onDecrease, canIncrease, canDecrease }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}: {value}</Text>
      <View style={styles.rowButtons}>
        <ActionButton label="-" color="#0f3460" onPress={onDecrease} disabled={!canDecrease} />
        <ActionButton label="+" color="#4cd137" onPress={onIncrease} disabled={!canIncrease} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center', padding: 20 },
  portrait: { width: 100, height: 100, marginBottom: 16 },
  heading: { color: '#fff', fontSize: 20, marginBottom: 8, textAlign: 'center' },
  pointsRemaining: { color: '#aaa', fontSize: 16, marginBottom: 20 },
  row: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  rowLabel: { color: '#fff', fontSize: 18 },
  rowButtons: { flexDirection: 'row', gap: 12 },
});
