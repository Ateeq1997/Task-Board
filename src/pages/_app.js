import { BoardProvider } from '../context/BoardContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <BoardProvider>
        <Component {...pageProps} />
      </BoardProvider>
    </>
  );
}

export default MyApp;
