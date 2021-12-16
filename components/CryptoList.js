import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const CryptoList = ({ shortName, name, price, priceChange, logo, onPress }) => {
  const changeColor = priceChange > 0 ? "green" : "red";

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            source={{
              uri: logo,
            }}
            style={styles.image}
          />
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{shortName.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <Text style={styles.title}>
            {price.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
            €
          </Text>
          <Text style={(styles.subtitle, { color: changeColor })}>
            {priceChange.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 40,
    width: 40,
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 18,
    marginLeft: 5,
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    marginLeft: 5,
    color: "grey",
  },
});

export default CryptoList;
