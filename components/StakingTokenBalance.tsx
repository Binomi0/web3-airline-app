import {
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
} from "@thirdweb-dev/react";
import styles from "../styles/Staking.module.css";
import { useEffect } from "react";
import { stakingTokenAddress } from "../pages/staking";

const StakingTokenBalance = () => {
  const address = useAddress();
  const { contract, isLoading } = useContract(stakingTokenAddress, "token");
  const { data, refetch } = useTokenBalance(contract, address);

  useEffect(() => {
    setInterval(() => {
      refetch();
    }, 10000);
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <a className={styles.card}>
      <h2>Stake token balance</h2>
      <p>{data?.displayValue}</p>
    </a>
  );
};

export default StakingTokenBalance;
