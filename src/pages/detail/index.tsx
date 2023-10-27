import styles from "./detail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface CoinProp {
  symbol: string;
  name: string;
  price: string;
  market_cap: string;
  low_24h: string;
  high_24h: string;
  total_volume_24h: string;
  delta_24h: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedLowPrice: string;
  formatedHightPrice: string;
  error?: string;
  numberDelta: number;
}

export default function Detail() {
  const { cripto } = useParams();
  const [detail, setDetail] = useState<CoinProp>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    function getData() {
      fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=9f3ae9d85e15c10a&pref=BRL&symbol=${cripto}
      `)
        .then((response) => response.json())
        .then((data: CoinProp) => {
          if (data.error) {
            navigate("/");
          }

          let price = Intl.NumberFormat("pr-BR", {
            style: "currency",
            currency: "BRL",
          });

          const resultData = {
            ...data,
            formatedPrice: price.format(Number(data.price)),
            formatedMarket: price.format(Number(data.market_cap)),
            formatedLowPrice: price.format(Number(data.low_24h)),
            formatedHightPrice: price.format(Number(data.high_24h)),
            numberDelta: parseFloat(data.delta_24h.replace(",", ".")),
          };
          setDetail(resultData);
          setLoading(false);
        });
    }

    getData();
  }, [cripto]);

  if (loading) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>carregando informações...</h4>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{detail?.name}</h1>
      <p className={styles.center}>{detail?.symbol}</p>

      <section className={styles.content}>
        <p>
          <strong>Preço: </strong> {detail?.formatedPrice}
        </p>
        <p>
          <strong>Maior preço 24h: </strong> {detail?.formatedHightPrice}
        </p>
        <p>
          <strong>Menor preço 24h: </strong> {detail?.formatedLowPrice}
        </p>
        <p>
          <strong>Delta 24h: </strong>
          <span
            className={
              detail?.numberDelta && detail.numberDelta >= 0 ? styles.profit : styles.loss
            }
          >
            {detail?.delta_24h}
          </span>
        </p>
        <p>
          <strong>Valor Mercado: </strong> {detail?.formatedMarket}
        </p>
      </section>
    </div>
  );
}
