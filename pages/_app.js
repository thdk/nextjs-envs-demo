import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  console.log('FOO', process.env.FOO);
  console.log('NEXT_PUBLIC_FOO', process.env.NEXT_PUBLIC_FOO);
  return <Component {...pageProps} />
}

export default MyApp
