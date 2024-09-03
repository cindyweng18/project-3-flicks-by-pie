import PropTypes from 'prop-types';
import 'styles/starter.scss';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.element,
  pageProps: PropTypes.object,
};

export default MyApp;
