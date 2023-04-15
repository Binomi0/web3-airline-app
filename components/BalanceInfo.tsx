import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import styles from "../styles/Staking.module.css";
import { BigNumber, ethers } from "ethers";
import { useEffect } from "react";
import { stakingContractAddress } from "../pages/staking";

const BalanceInfo = () => {
  const { contract } = useContract(stakingContractAddress, "custom");
  const { data, refetch, isLoading } = useContractRead(
    contract,
    "getRewardTokenBalance"
  );

  useEffect(() => {
    setInterval(() => {
      refetch();
    }, 10000);
  });

  if (isLoading) return <p>Cargando...</p>;

  return (
    <p>
      Staking Contract Reward Token Balance: {BigNumber.from(data).toString()}
    </p>
  );
};

export default BalanceInfo;
