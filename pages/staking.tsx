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
import BalanceInfo from "../components/BalanceInfo";

export const stakingContractAddress =
  "0xC1B64C583cbaA6DA78Ac3b41367d22B5e0E992Ff";
export const stakingTokenAddress = "0x056B388bB988f990F15e203f2fe88bE4faeA9846";
export const rewardTokenAddress = "0x875f1F2A0b579545856060cC15add62bB2b5a038";

const Staking: NextPage = () => {
  const [amountToStake, setAmountToStake] = useState("");
  const { contract: staking, isLoading: isStakingLoading } = useContract(
    stakingContractAddress,
    "custom"
  );
  const { contract: stakingToken, isLoading: isStakingTokenLoading } =
    useContract(stakingTokenAddress, "token");
  const { data, isLoading } = useContractRead(stakingToken, "contractURI");

  console.log("data", data);

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

  if (isStakingLoading || isStakingTokenLoading || isLoading) {
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
        <BalanceInfo />
        <div className={styles.stakeContainer}>
          <input
            className={styles.textbox}
            type="number"
            value={amountToStake}
            onChange={(e) => setAmountToStake(e.target.value)}
          />
          <Web3Button
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
          </Web3Button>

          <Web3Button
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
          </Web3Button>

          <Web3Button
            className={styles.button}
            contractAddress={stakingContractAddress}
            action={async (contract) => {
              await contract.call("claimRewards");
              alert("Rewards claimed successfully!");
            }}
          >
            Claim rewards!
          </Web3Button>
        </div>

        {/* <div className={styles.grid}>
          <StakingTokenBalance />
          <RewardTokenBalance />
          <StakeInfo />
        </div> */}
      </main>
    </div>
  );
};

export default Staking;
