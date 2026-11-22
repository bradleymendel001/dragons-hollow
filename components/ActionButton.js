import { Pressable, Text, StyleSheet } from 'react-native';

export default function ActionButton({ label, onPress, color= '#e94560', disabled }) {
  return (
    <Pressable
      style={[ styles.button, {backgroundColor: color }, disabled && styles.disabled,]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center', marginVertical: 6},
  disabled: { opacity: 0.4 },
  label: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
