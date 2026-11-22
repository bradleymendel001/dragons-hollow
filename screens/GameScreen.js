import { useReducer, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import StatBar from '../components/StatBar';
import ActionButton from '../components/ActionButton';
import { GOBLIN } from '../data/enemy';
import { battleReducer, initialBattleState } from '../reducers/battleReducer';

export default function GameScreen({ route, navigation }) {
  const { character,heroName } = route.params;

  const [battle, dispatch] = useReducer(battleReducer, initialBattleState(character, GOBLIN));
  const [screen, setScreen] = useState('battle');

  useEffect(() => {
    if (battle.enemyHp <= 0) setScreen('victory');
    else if (battle.playerHp <= 0) setScreen('defeat');
  },
  [battle.enemyHp, battle.playerHp]);

  useEffect (() => {
    if (battle.turn === 'enemy' && battle.enemyHp > 0) {
      const timer = setTimeout(() => {
        const damage = Math.floor(Math.random() * GOBLIN.attack) + 1;
        dispatch({ type: 'ENEMY_ATTACK', payload: { damage } });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [battle.turn]);

const handleAttack = () => {
  const damage = Math.floor(Math.random() * character.attack) + 1;
  dispatch({ type: 'PLAYER_ATTACK', payload: { damage }});
};

const handlePlayAgain = () => {
  dispatch({ type: 'RESET', payload: { player: character, enemy: GOBLIN } });
  setScreen('battle');
};

return (
  <View style={styles.container}>
    {screen === 'battle' && (
      <BattleView
        character={character}
        heroName={heroName}
        battle={battle}
        onAttack={handleAttack}
        onInventory={() => setScreen('inventory')}
      />
    )}
    {screen === 'inventory' && (
      <InventoryView
        inventory={battle.inventory}
        canAct={battle.turn === 'player'}
        onUseItem={(itemId) => {
          dispatch({ type: 'USE_ITEM', payload: {itemId}});
          setScreen('battle');
        }}
        onBack={() => setScreen('battle')}
      />
    )}
    {(screen === 'victory' || screen === 'defeat') && (
      <ResultView message={screen === 'victory' ? 'Victory!' : 'Defeat...'} onPlayAgain={handlePlayAgain} onHome={() => navigation.popToTop()} />
    )}
  </View>
  );
}

function BattleView({ character, heroName, battle, onAttack, onInventory}) {
  return (
    <>
      <Text style={styles.heading}>{heroName} vs {GOBLIN.name}</Text>
      <View style={styles.portraitRow}>
        <Image source={character.Image} style={styles.battlePortrait} resizeMode="contain" />
        <Image source={GOBLIN.Image} style={styles.battlePortrait} resizeMode="contain" />
      </View>
      {battle.log.slice(-4).map((line, i) => (
        <Text key={i} style={styles.logLine}>{line}</Text>
      ))}
      <StatBar label={character.name} value={battle.playerHp} max={battle.playerMaxHp} color="#4cd137" />
      <StatBar label={GOBLIN.name} value={battle.enemyHp} max={battle.enemyMaxHp} color="#e84118" />
      <View style={styles.buttonRow}>
        <ActionButton label="Attack" color="#e94560" onPress={onAttack} disabled={battle.turn !== 'player'} />
        <ActionButton label="Inventory" color="#0f3460" onPress={onInventory} />
      </View>
    </>
  );
}

function InventoryView({ inventory, onUseItem, canAct, onBack }) {
  return (
    <>
      <Text style={styles.heading}>Inventory</Text>
      {inventory.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <Text style={styles.item}>{item.name} x{item.quantity}</Text>
          {item.heal ? (
            <ActionButton
              label= "Use"
              color='#4cd137'
              onPress={() => onUseItem(item.id)}
              disabled={!canAct || item.quantity <= 0}
              />
          ) : null}
        </View>
      ))}
      <ActionButton label="Back to Battle" color="#0f3460" onPress={onBack} />
    </>
  );
}

function ResultView({ message, onPlayAgain, onHome}) {
  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultText}>{message}</Text>
      <ActionButton label="Play Again" color="#e94560" onPress={onPlayAgain} />
      <ActionButton label="Return Home" color="#0f3460" onPress={onHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20, paddingTop: 60 },
  heading: {fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 12, textAlign: 'center'},
  portraitRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16},
  battlePortrait: {width: 100, height: 100},
  logLine: {color: '#aaa', fontSize: 13, marginBottom: 2},
  buttonRow: {flexDirection: 'row', justifyContent: 'space-between' },
  item: {color: '#fff', fontSize: 16, marginVertical: 4 },
  resultContainer: {flex: 1, justifyContent: 'center', alignItems: 'center' },
  resultText: {fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 24 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginVertical: 4}
});