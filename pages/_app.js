import '../styles/main.scss';
import MaxWidthWrapper from '../components/MaxWidthWrapper';

function MyApp({ Component, pageProps }) {
  return (
    <MaxWidthWrapper>
      <Component {...pageProps} />
    </MaxWidthWrapper>
  );
}

export default MyApp
