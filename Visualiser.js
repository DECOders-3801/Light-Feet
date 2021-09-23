import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryPie } from "victory-native";

const graphicData = [
  { x: 1, y: 45},
  { x: 2, y: 55},
];

export default class Visualiser extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <VictoryPie
            //standalone={false}
            //animate={{ duration: 1000 }}
            width={300} height={300}
            data={graphicData}
            innerRadius={130}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: { fill: ({ datum }) => {
                const color = datum.y < 80 ? "green" : "red";
                return datum.x === 1 ? color : "transparent";
              }
              }
            }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});