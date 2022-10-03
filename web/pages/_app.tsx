import "../styles/global.css";
import "../styles/custom.scss";

import "../utils/yup-set-locale";
import AlertTemplate from "react-alert-template-basic";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

import "react-datepicker/dist/react-datepicker.css";
import Head from "next/head";

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

export default function App({ Component, pageProps }) {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Head>
        <title>PRACCISS</title>
      </Head>
      <Component {...pageProps} />
    </AlertProvider>
  );
}
