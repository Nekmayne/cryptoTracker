import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  ImageBackground,
} from "react-native";
import CryptoList from "./components/CryptoList";
import Chart from "./components/Chart";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

export default function App() {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["50%"], []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current.present();
  };

  useEffect(() => {
    const getMarketData = () => {
      fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=25&page=1&sparkline=true&price_change_percentage=7d"
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setData(responseJson);
        });
    };
    getMarketData();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/crypto1.jpeg")}
        blurRadius={15}
        style={styles.image}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Crypto Markets</Text>
        </View>

        <BottomSheetModalProvider>
          <FlatList
            keyExtractor={(item) => item.id}
            data={data}
            renderItem={({ item }) => (
              <CryptoList
                symbol={item.symbol}
                name={item.name}
                price={item.current_price}
                logo={item.image}
                priceChange={item.price_change_percentage_24h}
                onPress={() => openModal(item)}
              />
            )}
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            style={styles.bottomSheet}
          >
            {selectedCoinData ? (
              <Chart
                price={selectedCoinData.current_price}
                logo={selectedCoinData.image}
                name={selectedCoinData.name}
                symbol={selectedCoinData.symbol}
                priceChange={selectedCoinData.price_change_percentage_24h}
                sparkline={selectedCoinData.sparkline_in_7d.price}
              />
            ) : null}
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a2d69",
  },
  titleContainer: {
    marginTop: 70,
    marginLeft: 25,
  },
  title: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
  Divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "black",
  },
  bottomSheet: {
    color: "green",
  },
  contentContainer: {
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
});
