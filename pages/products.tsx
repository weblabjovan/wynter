import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../hooks/useAuth";
import useTableColumns from "../hooks/useColumns";
import FilteredTable from "../components/FilteredTable";
import apiClient from "../utils/apiClient";
import styles from "../styles/Home.module.css";
import Loader from "../components/Loader";

const Products: NextPage = () => {
  const { isAuth } = useAuth();
  const router = useRouter();

  const {
    data: productsList,
    isLoading,
    isError,
  } = useQuery(
    "GET_PRODUCTS",
    async () => {
      // no need for try and catch block cause react query is going to catch the error
      const result = await apiClient.get("/products");
      return result.data;
    },
    {
      enabled: isAuth,
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const columns = useTableColumns();

  const data: Record<string, any>[] = useMemo(() => {
    return productsList || [];
  }, [productsList]);

  useEffect(() => {
    if (!isAuth && router) {
      router.push("/", undefined, { shallow: true });
    }
  }, [isAuth, router]);

  if (!isAuth) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend task - products</title>
        <meta name="description" content="Frontend task - products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Products</h1>
        {!isLoading && isError ? (
          <div className={styles.error}>
            <h3>
              There was an issue with loading the products. Please try again
              later
            </h3>
          </div>
        ) : (
          <FilteredTable columns={columns} data={data} />
        )}
      </main>
    </div>
  );
};

export default Products;
