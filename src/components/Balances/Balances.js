import { PieChart, Pie, Cell } from "recharts";
import { useState, useEffect } from "react";
import apiClient from "../Services/apiClient";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const Balances = ({ user, wallet }) => {
  const [balance, setBalance] = useState([]);
  const [coinPrice, setCoinPrice] = useState([]);

  useEffect(() => {
    const fetchBalances = async () => {
      const { data } = await apiClient.getUsdWallet(user.id);
      console.log("usd", data.Wallet.usd);
      const result = data.Wallet.usd;
      if (data) {
        setBalance(result.toLocaleString());
      }

      const coins = [];
      const prices = [];
      wallet.map((coin) => {
        coins.push(coin.symbol);
      });
      console.log(coins);

      // const BTC = await apiClient.getCoinCurrentPrice(coins[0]);
      // const ADA = await apiClient.getCoinCurrentPrice(coins[1]);
      // const ETH = await apiClient.getCoinCurrentPrice(coins[2]);
      // const DOGE = await apiClient.getCoinCurrentPrice(coins[3]);
      // const DOT = await apiClient.getCoinCurrentPrice(coins[4]);
      // const XMR = await apiClient.getCoinCurrentPrice(coins[5]);
      const BTC = 30738.19;
      const ADA = 1.12;
      const ETH = 1826.22;
      const DOGE = 0.17;
      const DOT = 11.56;
      const XMR = 191.9;

      // prices.push(BTC.data.rate);
      // prices.push(ADA.data.rate);
      // prices.push(ETH.data.rate);
      // prices.push(DOGE.data.rate);
      // prices.push(DOT.data.rate);
      // prices.push(XMR.data.rate);
      prices.push(BTC);
      prices.push(ADA);
      prices.push(ETH);
      prices.push(DOGE);
      prices.push(DOT);
      prices.push(XMR);

      console.log("prices", prices);
      setCoinPrice(prices);

      // wallet.map((entry, index) => {
      //   const obj = { symbol: entry.symbol, amount: entry.amount * prices[index] };
      // });
    };
    fetchBalances();
  }, []);

  console.log("coinprice", coinPrice);
  console.log("wallet", wallet);

  let totalCoinWalletInUsd;

  if (wallet.length > 0) {
    totalCoinWalletInUsd =
      wallet[0].amount * coinPrice[0] +
      wallet[1].amount * coinPrice[1] +
      wallet[2].amount * coinPrice[2] +
      wallet[3].amount * coinPrice[3] +
      wallet[4].amount * coinPrice[4] +
      wallet[5].amount * coinPrice[5];

    if (totalCoinWalletInUsd === 0) {
      totalCoinWalletInUsd = 10000;
    }
  } else {
    totalCoinWalletInUsd = 10000;
  }

  console.log("coinWallet", totalCoinWalletInUsd);
  const COLORS = ["#4E93F5", "#17ECC5", "#F5FBFE", "#FAD679", "#F08FE1", "#D66168"];

  const useStyles = makeStyles({
    balances: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    chart: {
      marginTop: 110,
    },
    data: {
      width: "12vw",
      height: "5vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    usd: {
      marginTop: 50,
      marginBottom: 100,
    },
    col: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    percents: {
      width: "30vw",
      display: "flex",
      justifyContent: "space-between",
    },
    circle: {
      borderRadius: "50%",
      height: 10,
      width: 10,
      background: "#484392",
    },
    name: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "8rem",
    },
    coin: {
      width: "5rem",
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.balances}>
      <div className={classes.chart}>
        <PieChart width={730} height={250}>
          <Pie
            data={wallet}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={70}
            fill="#8884d8"
          >
            {wallet.map((entry, index) => (
              <Cell fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <Typography variant="h4" className={classes.usd}>
        Balance USD: ${balance}
      </Typography>
      <div className={classes.percents}>
        <div className={classes.col}>
          <div className={classes.data}>
            <div className={classes.name}>
              <div
                className={classes.circle}
                style={{ backgroundColor: "#4E93F5", filter: "drop-shadow(0px 4px 4px rgba(0, 151, 232, 0.8))" }}
              ></div>
              <Typography variant="body1" className={classes.coin} style={{ fontSize: "1.1rem" }}>
                Bitcoin
              </Typography>
            </div>
            <Typography variant="body1" style={{ color: "#4E93F5", fontSize: "1.1rem" }}>
              {wallet.length > 0 && (((wallet[0].amount * coinPrice[0]) / totalCoinWalletInUsd) * 100).toFixed(2) + "%"}
            </Typography>
          </div>
          <div className={classes.data}>
            <div className={classes.name}>
              <div
                className={classes.circle}
                style={{ backgroundColor: "#17ECC5", filter: "drop-shadow(0px 4px 4px rgba(23, 236, 197, 0.8))" }}
              ></div>
              <Typography variant="body1" className={classes.coin} style={{ fontSize: "1.1rem" }}>
                Cardano
              </Typography>
            </div>
            <Typography variant="body1" style={{ color: "#17ECC5", fontSize: "1.1rem" }}>
              {wallet.length > 0 && (((wallet[1].amount * coinPrice[1]) / totalCoinWalletInUsd) * 100).toFixed(2) + "%"}
            </Typography>
          </div>
          <div className={classes.data}>
            <div className={classes.name}>
              <div
                className={classes.circle}
                style={{ backgroundColor: "#F5FBFE", filter: "drop-shadow(0px 4px 4px rgba(138, 83, 255, 0.8))" }}
              ></div>
              <Typography variant="body1" className={classes.coin} style={{ fontSize: "1.1rem" }}>
                Ethereum
              </Typography>
            </div>
            <Typography variant="body1" style={{ color: "#F5FBFE", fontSize: "1.1rem" }}>
              {wallet.length > 0 && (((wallet[2].amount * coinPrice[2]) / totalCoinWalletInUsd) * 100).toFixed(2) + "%"}
            </Typography>
          </div>
        </div>
        <div className={classes.col}>
          <div className={classes.data}>
            <div className={classes.name}>
              <div
                className={classes.circle}
                style={{ backgroundColor: "#FAD679", filter: "drop-shadow(0px 4px 4px rgba(250, 214, 121, 0.8))" }}
              ></div>
              <Typography variant="body1" className={classes.coin} style={{ fontSize: "1.1rem" }}>
                Dogecoin
              </Typography>
            </div>
            <Typography variant="body1" style={{ color: "#FAD679", fontSize: "1.1rem" }}>
              {wallet.length > 0 && (((wallet[3].amount * coinPrice[3]) / totalCoinWalletInUsd) * 100).toFixed(2) + "%"}
            </Typography>
          </div>
          <div className={classes.data}>
            <div className={classes.name}>
              <div
                className={classes.circle}
                style={{ backgroundColor: "#F08FE1", filter: "drop-shadow(0px 4px 4px rgba(204, 71, 207, 0.8))" }}
              ></div>
              <Typography variant="body1" className={classes.coin} style={{ fontSize: "1.1rem" }}>
                Polkadot
              </Typography>
            </div>
            <Typography variant="body1" style={{ color: "#F08FE1", fontSize: "1.1rem" }}>
              {wallet.length > 0 && (((wallet[4].amount * coinPrice[4]) / totalCoinWalletInUsd) * 100).toFixed(2) + "%"}
            </Typography>
          </div>
          <div className={classes.data}>
            <div className={classes.name}>
              <div
                className={classes.circle}
                style={{ backgroundColor: "#D66168", filter: "drop-shadow(0px 4px 4px rgba(214, 97, 104, 0.8))" }}
              ></div>
              <Typography variant="body1" className={classes.coin} style={{ fontSize: "1.1rem" }}>
                Monero
              </Typography>
            </div>
            <Typography variant="body1" style={{ color: "#D66168", fontSize: "1.1rem" }}>
              {wallet.length > 0 && (((wallet[5].amount * coinPrice[5]) / totalCoinWalletInUsd) * 100).toFixed(2) + "%"}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balances;
