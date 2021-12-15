import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import { LineChart } from "react-native-chart-kit";

const Chart = ({ price, logo, symbol, priceChange, sparkline, name }) => {
  return (
    <View style={styles.chartContainer}>
      <View>
        <Image source={{ uri: logo }} style={styles.image} />
        <Text style={styles.titles}>{name}</Text>

        <Text style={styles.titles}>
          {price < 999 ? price.toFixed(2) : price.toFixed(0)}€
        </Text>
      </View>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: "white",
    margin: 15,
  },
  image: {
    height: 50,
    width: 50,
  },
  titles: {
    fontSize: 25,
  },
});
