
const handlePress = async () => {
    const redirect = {DeepLinkOfYourApp};
    const scopes = 'email https://uri.paypal.com/services/paypalattributes'; // example scopes
    const clientId = {YourAppClientId};
    const urlPaypalLogin = `https://www.sandbox.paypal.com/connect/?flowEntry=static&redirect_uri=${redirect}&client_id=${clientId}&scope=${scopes}&state=FR`;
    const supported = await Linking.canOpenURL(urlPaypalLogin);
    if (supported) {
      await Linking.openURL(urlPaypalLogin);
    } else {
      Alert.alert(`Don't know how to open this URL: ${urlPaypalLogin}`);
    }
  };