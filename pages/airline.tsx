import { ConnectWallet, useAddress, useSigner } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import airlineCoinABI from "../contracts/AirlineCoin.json";
import airlineRewardABI from "../contracts/AirlineRewardCoin.json";
import airlineStakingABI from "../contracts/StakingAirline.json";
import {
  stakingTokenAddress,
  rewardTokenAddress,
  stakingContractAddress,
} from "./staking";

const Airline: NextPage = () => {
  const signer = useSigner();

  useEffect(() => {
    const contract = new ethers.Contract(
      stakingContractAddress,
      airlineStakingABI.abi,
      signer
    );

    contract
      .getRewardTokenBalance()
      .then((data: BigNumber) => console.log(data.toString()));
  }, [signer]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="http://thirdweb.com/">thirdweb</a>!
        </h1>

        <p className={styles.description}>
          Get started by configuring your desired network in{" "}
          <code className={styles.code}>pages/_app.tsx</code>, then modify the{" "}
          <code className={styles.code}>pages/index.tsx</code> file!
        </p>

        <div className={styles.connect}>
          <ConnectWallet />
        </div>

        <div className={styles.grid}>
          <a href="https://portal.thirdweb.com/" className={styles.card}>
            <h2>Portal &rarr;</h2>
            <p>
              Guides, references and resources that will help you build with
              thirdweb.
            </p>
          </a>

          <a href="https://thirdweb.com/dashboard" className={styles.card}>
            <h2>Dashboard &rarr;</h2>
            <p>
              Deploy, configure and manage your smart contracts from the
              dashboard.
            </p>
          </a>

          <a
            href="https://portal.thirdweb.com/templates"
            className={styles.card}
          >
            <h2>Templates &rarr;</h2>
            <p>
              Discover and clone template projects showcasing thirdweb features.
            </p>
          </a>

          <a href="/staking" className={styles.card}>
            <h2>Staking &rarr;</h2>
            <p>
              Empieza a hacer Staking con el toke de la aerolínea más
              descentralizada.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Airline;
