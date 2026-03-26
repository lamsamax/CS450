import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const API_KEY = "YOUR_API_KEY";

  const searchWeather = async () => {
    const formattedCity = city.trim();

    if (!formattedCity) {
      alert("Please enter a city");
      return;
    }

    try {
      setLoading(true);
      setWeather(null);

      // ✅ Check local storage first
      const saved = await AsyncStorage.getItem(formattedCity);

      if (saved) {
        setWeather(JSON.parse(saved));
        setLoading(false);
        setCity('');
        return;
      }

      // ✅ Fetch from API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${formattedCity}&appid=${API_KEY}&units=metric`
      );

      if (response.status === 404) {
        setLoading(false);
        alert("City not found!");
        return;
      }

      const data = await response.json();

      const result = {
        name: data.name,
        country: data.sys.country,
        station: data.base,
        temp: data.main.temp,
        icon: data.weather[0].icon
      };

      setWeather(result);

      // ✅ Save locally
      await AsyncStorage.setItem(formattedCity, JSON.stringify(result));

      setCity('');

    } catch (error) {
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city name..."
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.button} onPress={searchWeather}>
        <Text style={styles.buttonText}>SEARCH</Text>
      </TouchableOpacity>

      {/* 🔄 Loading indicator */}
      {loading && <ActivityIndicator size="large" color="#E55812" style={{ marginTop: 20 }} />}

      {/* 🌤 Weather Card */}
      {weather && !loading && (
        <View style={styles.card}>
          <Text style={styles.city}>
            {weather.name} ({weather.country})
          </Text>

          <Text style={styles.station}>
            {weather.station}
          </Text>

          <Text style={styles.temp}>
            {weather.temp} °C
          </Text>

          <Image
            source={
              imageError
                ? require('./assets/icon.png') // optional fallback image 
                : { uri: `https://openweathermap.org/img/w/${weather.icon}.png` }
            }
            style={styles.icon}
            onError={() => setImageError(true)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5ED',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },

  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff'
  },

  button: {
    backgroundColor: '#E55812',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 5
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  card: {
    marginTop: 20,
    padding: 20,
    width: '80%',
    borderRadius: 12,
    backgroundColor: '#EFE7DA',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },

  city: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },

  station: {
    fontSize: 14,
    color: '#555'
  },

  temp: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#E55812'
  },

  icon: {
    width: 80,
    height: 80
  }
});