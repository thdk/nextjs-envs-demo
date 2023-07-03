# Using environment variables with nextjs

Inspired by https://www.saltycrane.com/blog/2021/04/buildtime-vs-runtime-environment-variables-nextjs-docker/

## Setup

Create a dummy nextjs 12 app
```sh
npx create-next-app@12 nextjs-envs-demo && cd nextjs-envs-demo && npm i next@12
```

Log two envrionment variables from with the render method of your App component:
```js
// _app.js
function MyApp({ Component, pageProps }) {
  console.log('FOO', process.env.FOO);
  console.log('NEXT_PUBLIC_FOO', process.env.NEXT_PUBLIC_FOO);
  return <Component {...pageProps} />
}

export default MyApp
```

## SSG Pages (Static Site Generation)

Run following commands and visit: [http://localhost:3000]

| set env at | cmd | log in browser console | log in server terminal at build time |
| --- | --- | --- | --- |
| none |```npm run dev```| undefined |  |
| both |```FOO=bar npm run dev```| undefined | bar (runtime server terminal)|
| build time|```FOO=bar npm run build; npm run start```| undefined | bar |
| run time|```npm run build; FOO=bar npm run start```| undefined |  |
| both |```NEXT_PUBLIC_FOO=bar npm run dev```| bar | bar (runtime server terminal)|
| build time |```NEXT_PUBLIC_FOO=bar npm run build; npm run start```| bar | bar |
| run time |```npm run build; NEXT_PUBLIC_FOO=bar npm run start```| undefined |  |

## SSR (Server Side Rendered)

```js
// pages/server.js
export function getServerSideProps() {
    return {props: {}};
}
```

Run following commands and visit: [http://localhost:3000/server]

| set env at |  cmd | log in browser console | log in server terminal at run time |
| --- | --- | --- | --- |
| none |```npm run dev```| undefined | undefined |
| both|```FOO=bar npm run dev```| undefined | bar |
| build time |```FOO=bar npm run build; npm run start```| undefined | undefined |
| run time |```npm run build; FOO=bar npm run start```| undefined | bar |
| both |```NEXT_PUBLIC_FOO=bar npm run dev```| bar | bar |
| build time |```NEXT_PUBLIC_FOO=bar npm run build; npm run start```| bar | bar |
| run time |```npm run build; NEXT_PUBLIC_FOO=bar npm run start```| undefined | bar |
