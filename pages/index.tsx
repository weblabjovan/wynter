import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import { useAuth } from "../hooks/useAuth";
import { initializeGoogleButton } from "../utils/initializeGoogleButton";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { isAuth, storeToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuth && router) {
      router.push("/products", undefined, { shallow: true });
    }
  }, [isAuth, router]);

  if (isAuth) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onLoad={() => initializeGoogleButton("buttonDiv", storeToken)}
      />
      <Head>
        <title>Frontend task - Sign in</title>
        <meta name="description" content="Frontend task - Sign in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Frontend task</h1>

        <p className={styles.description}>Sign in to see the products</p>
        <div id="buttonDiv" data-testid="buttonDiv"></div>
      </main>
    </div>
  );
};

export default Home;
