import AsyncStorage from "@react-native-async-storage/async-storage";

async function storeToken(username, password) {
  try {
    console.log("locally storing user", {
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

async function storeProfilePicture(photo) {
  try {
    console.log("locally storing profilePicture", photo);
    await AsyncStorage.setItem(
      "profilePicture",
      JSON.stringify({ profilePicture: photo })
    );
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

async function getProfilePicture() {
  try {
    let profilePicture = await AsyncStorage.getItem("profilePicture");
    let data = JSON.parse(profilePicture);
    return data;
  } catch (error) {
    console.log("Something went wrong", error);
    return null;
  }
}

export { storeToken, getToken, storeProfilePicture, getProfilePicture };
