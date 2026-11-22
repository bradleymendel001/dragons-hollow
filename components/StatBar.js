import { View, Text, StyleSheet } from 'react-native';

export default function StatBar({ label, value, max, color}) {
  const percent = Math.max(value / max, 0) * 100;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}: {value}/{max}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginVertical: 6 },
  label: { color:'#fff', marginBottom: 2},
  track: {height: 14, backgroundColor: '#333', borderRadius: 7, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 7 },
});
