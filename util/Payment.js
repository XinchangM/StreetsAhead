
import React from 'react';
import { useState } from 'react';
import {
  View,
  WebView,
  ActivityIndicator
} from 'react-native'

export default function Paypal() {

  const [isWebViewLoading, SetIsWebViewLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [paypalUrl, setPaypalUrl] = useState("");
  // const [paymentId, setPaymentId] = useState(null);
  const [shouldShowWebViewLoading, setShouldShowWebviewLoading] = useState(true);

  const payTip = async () => {
    const dataDetail = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "transactions": [{
        "amount": {
          "total": "1 CAD",
          "currency": "CAD",
          "details": {
            "subtotal": "1 CAD",
            "tax": "0",
            "shipping": "0",
            "handling_fee": "0",
            "shipping_discount": "0",
            "insurance": "0"
          }
        }

      }],
      "redirect_urls": {
        "return_url": "https://example.com",
        "cancel_url": "https://example.com"
      }
    }
  }
  fetch('https://api.sandbox.paypal.com/v1/oauth2/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer EOe1myDLOYJhiUjEiLBduDCR7FuiwovuLoAujF6YGleY9bWUmLKA9U3_WcVF2txDdiLFt9zhpCBdWwQ-`
      },
      body: 'grant_type=client_credentials'
    }
  )
    .then(response => {
      // this.setState({
      //   accessToken: response.data.access_token
      // })
      setAccessToken(response.data.access_token);
      fetch('https://api.sandbox.paypal.com/v1/payments/payment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${response.accessToken}`
          },
          body: JSON.stringify(dataDetail)
        }
      )
        .then(response => {

          const { id, links } = response.data
          const approvalUrl = links.find(data => data.rel == "approval_url").href
          setPaymentId(id);
          setPaypalUrl(approvalUrl);

        }).catch(err => {
          console.log({ ...err })
        })
    }).catch(err => {
      console.log({ ...err })
    })

  onWebviewLoadStart = () => {
    if (shouldShowWebViewLoading) {
      SetIsWebViewLoading(true)
    }
  }


  _onNavigationStateChange = (webViewState) => {
    if (webViewState.title == "") {

      setShouldShowWebviewLoading(false)
    }


    if (webViewState.url.includes('https://example.com/')) {

      setPaypalUrl(null)

      const urlArr = webViewState.url.split(/(=|&)/);
      const paymentId = urlArr[2];
      const payerId = urlArr[10];
      // const { PayerID, paymentId } = webViewState.url

      fetch(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: { payer_id: payerId }
        }
      )
        .then(response => {
          console.log(response)

        }).catch(err => {
          console.log({ ...err })
        })

    }
  }


  return (
    <View style={{ flex: 1 }}>
       {paypalUrl ? (
        <View style={styles.webview}>
          <WebView
            style={{ height: "100%", width: "100%" }}
            source={{ uri: paypalUrl }}
            onNavigationStateChange={this._onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            onLoadStart={onWebviewLoadStart}
            onLoadEnd={() => SetIsWebViewLoading(false)}
          />
        </View>
      ) : null}
      {isWebViewLoading ? (
        <View style={{ ...StyleSheet.absoluteFill, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
          <ActivityIndicator size="small" color="#A02AE0" />
        </View>
      ) : null}
    </View>
  )
}