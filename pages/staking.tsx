import {
  useContractRead,
  useContract,
  ConnectWallet,
  useContractWrite,
  useAddress,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Staking.module.css";
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import StakeInfo from "../components/StakeInfo";
import RewardTokenBalance from "../components/RewardTokenBalance";
import StakingTokenBalance from "../components/StakingTokenBalance";
// import BalanceInfo from "../components/BalanceInfo";

export const stakingContractAddress =
  "0x3550B7B341C2a56751719a4aE9D01ee28C318907";
export const stakingTokenAddress = "0xfdc7C97F7B006dDd1F0B48bf35BE5aeB7153d2b6";
export const rewardTokenAddress = "0x4eF73A2AC6DB13F309F824b7206672954aF62C4d";

const Staking: NextPage = () => {
  const [amountToStake, setAmountToStake] = useState("");
  // const { contract: staking, isLoading: isStakingLoading } = useContract(
  //   stakingContractAddress,
  //   "custom"
  // );
  const { contract: stakingToken, isLoading: isStakingTokenLoading } =
    useContract(stakingTokenAddress, "token");
  const { data, isLoading } = useContractRead(stakingToken, "contractURI");

  // console.log("data", data);

  // const { contract: rewardToken, isLoading: isRewardTokenLoading } =
  //   useContract(rewardTokenAddress, "token");

  // const { mutateAsync: claimRewards, isLoading: isClaimLoading } =
  //   useContractWrite(staking, "claimRewards");

  // const handleClaimRewards = useCallback(async () => {
  //   try {
  //     const data = await claimRewards({});
  //     console.info("Contract call success", data);
  //   } catch (err) {
  //     console.error("Contract call failure", err);
  //   }
  // }, [claimRewards]);

  if (isStakingTokenLoading || isLoading) {
    return <div>Loading...</div>;
  }

  // console.log("claimRewards =>", claimRewards);
  // console.log(staking)
  // console.log(stakingToken)
  // console.log(rewardToken)
  // console.log(stakingTokenBalance?.displayValue);
  // console.log(rewardTokenBalance?.displayValue);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <a href="/" className={styles.card}>
          <h2>Home &rarr;</h2>
          <p>Volver a la página principal</p>
        </a>
        {/* <BalanceInfo /> */}
        <div className={styles.stakeContainer}>
          <input
            className={styles.textbox}
            type="number"
            value={amountToStake}
            onChange={(e) => setAmountToStake(e.target.value)}
          />
          {/* <Web3Button
            className={styles.button}
            contractAddress={stakingContractAddress}
            action={async (contract) => {
              await stakingToken?.setAllowance(
                stakingContractAddress,
                amountToStake
              );
              await contract.call("stake", [
                ethers.utils.parseEther(amountToStake),
              ]);
              alert("Tokens staked successfully!");
            }}
          >
            Stake!
          </Web3Button> */}

          {/* <Web3Button
            className={styles.button}
            contractAddress={stakingContractAddress}
            action={async (contract) => {
              await contract.call("withdraw", [
                ethers.utils.parseEther(amountToStake),
              ]);
              alert("Tokens unstaked successfully!");
            }}
          >
            Unstake!
          </Web3Button> */}

          {/* <Web3Button
            className={styles.button}
            contractAddress={stakingContractAddress}
            action={async (contract) => {
              await contract.call("claimRewards");
              alert("Rewards claimed successfully!");
            }}
          >
            Claim rewards!
          </Web3Button> */}
        </div>

        <div className={styles.grid}>
          <StakingTokenBalance />
          <RewardTokenBalance />
          <StakeInfo />
        </div>
      </main>
    </div>
  );
};

export default Staking;
