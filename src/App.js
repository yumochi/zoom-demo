import logo from './logo.svg';
import './App.css';
import React from 'react';
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

const apiKey = "Z0SooeRWTYeW-lMosu6Esw";
const apiSecret = "zQ6vOkhNn1ipdNFuvsxyH2W0kY2IxO30i7WX";
const meetingNumber = 9996965760;
const role = 1;

const client = ZoomMtgEmbedded.createClient();

const crypto = require('crypto') // crypto comes with Node.js

function generateSignature() {
  // Prevent time sync issue between client signature generation and zoom 
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
  const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
  const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

  return signature
};

class App extends React.Component {
  constructor(props) {
    super(props);
    window.test = this;
  }

  generateSignature() {
    const signature = generateSignature();
    console.log(signature);
    return signature;
  }

  componentDidMount() {
    let meetingSDKElement = document.getElementById('meetingSDKElement');

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {
                console.log('custom button');
              }
            }
          ]
        }
      }
    });
  }

  join() {
    const apiKey = "Z0SooeRWTYeW-lMosu6Esw";
    const meetingNumber = 9996965760;
    const signature = this.generateSignature();
    client.join({
      apiKey: apiKey,
      signature: signature,
      meetingNumber: meetingNumber,
      password: "e46KK0",
      userName: "Yumo Chi2"
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://assembo-static-us-east-1.s3.amazonaws.com/assembo_w.png" className="App-logo" alt="logo" />
          <iframe height="620" align="middle" width="100%" border="0" src="https://docs.google.com/document/d/1EmPlSb-nAaeqaioBRYTqRzjp4UaFlO3ab8oLrTpQunI/edit?usp=sharing"></iframe>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div id="meetingSDKElement">
            {/* <!-- Zoom Meeting SDK Rendered Here --> */}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
