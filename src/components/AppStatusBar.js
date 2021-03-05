import React from "react";
import { StatusBar } from "react-native";

function AppStatusBar() {
  return (
    <StatusBar
      barStyle="dark-content"
      // dark-content, light-content and default
      hidden={false}
      //To hide statusBar
      backgroundColor="#00BCD4"
      //Background color of statusBar only works for Android
      translucent={false}
      //allowing light, but not detailed shapes
      networkActivityIndicatorVisible={true}
    />
  );
}

export default AppStatusBar;
