import { View, StyleSheet } from 'react-native';

export default function HealthBar ({ health }) {
  const healthPercentage = (health / 50) * 100
  const barWidth = `${healthPercentage + 1}%`

  return (
    <View className="w-full h-2 bg-red-600 rounded-sm overflow-hidden">
      <View className="h-full bg-green-600" style={{ width: barWidth }} />
    </View>
  )
}