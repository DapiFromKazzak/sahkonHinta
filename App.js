import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react'

export default function App() {
  const [hinta, setHinta] = useState(0)

  const PRICE_ENDPOINT = 'https://api.porssisahko.net/v1/price.json';

  const haeHinta = async () =>{
    console.log("haetaan hintaa...")
    const dateAndTimeNow = new Date();
    const year = dateAndTimeNow.getFullYear();
    const month = dateAndTimeNow.getMonth() + 1;
    const day = dateAndTimeNow.getDate();
    const hour = dateAndTimeNow.getHours();

    const twoDigits = (number) => (number < 10 ? `0${number}` : `${number}`);

    const params = `date=${year}-${twoDigits(month)}-${twoDigits(day)}&hour=${twoDigits(hour)}`;
    const response = await fetch(`${PRICE_ENDPOINT}?${params}`);
    const { price } = await response.json();
    console.log(price)

    setHinta(price)
  }
  

  return (
    <View style={styles.container}>
      <Text>Sähkön hinta:</Text>
      <Text>{hinta} €/KWh</Text>
      <Button 
        onPress={haeHinta}
        title="Hae hinta"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
