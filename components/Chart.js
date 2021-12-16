import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";
import { useSharedValue } from "react-native-reanimated";
import { withTheme } from "react-native-elements";

export const { width: SIZE } = Dimensions.get("window");

const Chart = ({ price, logo, shortName, priceChange, sparkline, name }) => {
  const latestCurrentPrice = useSharedValue(price);
  const [chartReady, setChartReady] = useState(false);
  const changeColor = priceChange > 0 ? "green" : "red";

  useEffect(() => {
    latestCurrentPrice.value = price;

    setTimeout(() => {
      setChartReady(true);
    }, 0);
  }, [price]);

  const formatUSD = (value) => {
    "worklet";
    if (value === "") {
      const formattedValue = `${latestCurrentPrice.value.toLocaleString(
        "en-US",
        { currency: "EUR" }
      )}€`;
      return formattedValue;
    }

    const formattedValue = `${parseFloat(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}€`;

    return formattedValue;
  };

  return (
    <ChartPathProvider
      data={{ points: sparkline, smoothingStrategy: "bezier" }}
    >
      <View style={styles.chartContainer}>
        <ImageBackground
          source={require("../assets/crypto1.jpeg")}
          blurRadius={15}
          style={styles.backgroundImage}
        >
          <View style={styles.firstTitles}>
            <View style={styles.firstLeftTitle}>
              <Image source={{ uri: logo }} style={styles.image} />
              <Text style={styles.titles}>
                {name} {shortName.toUpperCase()}{" "}
              </Text>
            </View>
            <View>
              <Text style={styles.priceChange}>7 days</Text>
            </View>
          </View>

          <View style={styles.secondTitles}>
            <ChartYLabel format={formatUSD} style={styles.boldTitle} />

            <Text style={[styles.priceChange, { color: changeColor }]}>
              {priceChange.toFixed(2)}%
            </Text>
          </View>

          <View style={styles.chartLineWrapper}>
            <ChartPath height={SIZE / 2} stroke="white" width={SIZE} />
            <ChartDot style={{ backgroundColor: "white" }} />
          </View>
        </ImageBackground>
      </View>
    </ChartPathProvider>
  );
};

export default Chart;

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  firstTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -25,
    marginLeft: 10,
  },
  firstLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  boldTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
  priceChange: {
    marginRight: 10,
    color: "white",
  },
  titles: {
    color: "white",
  },
});
