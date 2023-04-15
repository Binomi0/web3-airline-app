import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import styles from "../styles/Staking.module.css";
import { ethers } from "ethers";
import { stakingContractAddress } from "../pages/staking";

const StakeInfo = () => {
  const address = useAddress();
  const { contract: staking, isLoading: isStakingLoading } = useContract(
    stakingContractAddress,
    "custom"
  );

  const { data, refetch, isLoading } = useContractRead(
    staking,
    "getStakeInfo",
    [address] || "0"
  );

  if (isLoading) return <p>Cargando...</p>;

  return (
    <>
      <a className={styles.card}>
        <h2>Staked amount</h2>
        <p>{data && ethers.utils.formatEther(data[0].toString())}</p>
      </a>

      <a className={styles.card}>
        <h2>Current reward</h2>
        <p>{data && ethers.utils.formatEther(data[1].toString())}</p>
      </a>
    </>
  );
};

export default StakeInfo;
