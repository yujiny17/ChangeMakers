import AsyncStorage from "@react-native-async-storage/async-storage";

async function storeToken(username, password) {
  try {
    console.log("storing user token", {
      username: username,
      password: password,
    });
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({ username: username, password: password })
    );
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

async function getToken() {
  try {
    let userData = await AsyncStorage.getItem("userData");
    let data = JSON.parse(userData);
    return data;
  } catch (error) {
    console.log("Something went wrong", error);
    return null;
  }
}

export { storeToken, getToken };
