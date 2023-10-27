import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";

import { BiSearch } from "react-icons/bi";
import { FormEvent, useEffect, useState } from "react";

interface CoinsProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarket: string;
  numberDelta: number;
}

interface DataProps {
  coins: CoinsProps[];
}

export default function Home() {
  const [coins, setCoins] = useState<CoinsProps[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      fetch(
        "https://sujeitoprogramador.com/api-cripto/?key=9f3ae9d85e15c10a&pref=BRL"
      )
        .then((response) => response.json())
        .then((data: DataProps) => {
          let coinsData = data.coins.slice(0, 15);

          let price = Intl.NumberFormat("pr-BR", {
            style: "currency",
            currency: "BRL",
          });

          const formatResult = coinsData.map((item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarket: price.format(Number(item.market_cap)),
              numberDelta: parseFloat(item.delta_24h.replace(",", ".")),
            };

            console.log(formated);
            return formated;
          });

          setCoins(formatResult);
        });
    }

    getData();
  }, []);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (inputValue === "") return;

    navigate(`/detail/${inputValue}`);
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          placeholder="Digite o simbolo da moeda: "
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          <BiSearch size={30} color="#FFF" />
        </button>
      </form>

      <table>
        <thead>
          <th scope="col">Moeda</th>
          <th scope="col">Valor mercado</th>
          <th scope="col">Preço</th>
          <th scope="col">Volume</th>
        </thead>
        <tbody id="tbody">
          {coins.map((coin) => (
            <tr key={coin.name} className={styles.tr}>
              <td className={styles.tdLabel} data-label="Moeda">
                <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                  <span>{coin.name}</span> | {coin.symbol}
                </Link>
              </td>
              <td className={styles.tdLabel} data-label="Mercado">
                {coin.formatedMarket}
              </td>
              <td className={styles.tdLabel} data-label="Preço">
                {coin.formatedPrice}
              </td>
              <td
                className={
                  coin.numberDelta >= 0 ? styles.tdProfit : styles.tdLoss
                }
                data-label="Volume"
              >
                <span> {coin.delta_24h} </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
