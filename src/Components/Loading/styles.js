import { StyleSheet, Dimensions } from "react-native";

const { height, width, fontScale } = Dimensions.get("window");

const styles = StyleSheet.create({

    contentStyle: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    }

});

export default styles;
