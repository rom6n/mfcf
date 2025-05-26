import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, type OpenedContract } from "@ton/core";
import { toNano } from "@ton/core";
import { useTonConnect } from "./useTonConnect";

export function useMainContract() {
  const client = useTonClient();
  const [contractData, setContractData] = useState<null | {
    counter: number;
    recent_sender: Address;
    owner: Address;
  }>();

  // ! was missing
  const [balance, setBalance] = useState<null | number>(0);
  const { sender } = useTonConnect();
    
    const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;
    const parsedAddress = Address.parse("EQBnodt3mWVa3p3hKj4f_5f6Sx2XSz6ihqrzlCRpsY97SItk");
    console.log("file: useMainContract.ts:22 ~ mainContract ~ parsedAddress:", parsedAddress.toString());


    const contract = new MainContract(parsedAddress);
    return client.open(contract) as OpenedContract<MainContract>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return;
      setContractData(null);
      const contractData = await mainContract.getData();
      const contractBalance = await mainContract.getBalance();
      setContractData({
        counter: contractData.number,
        recent_sender: contractData.recent_sender,
        owner: contractData.owner,
      });

      // ! was missing
      setBalance(contractBalance.number);
      await sleep(5000);
      getValue(); // sleep 5 seconds and poll value again
    }

    getValue();
  }, [mainContract]);

  return {
    contract_address: mainContract?.address.toString(),
    contract_balance: balance,
    sendIncrement: async () => {
        return await mainContract?.sendIncrement(sender, toNano("0.05"), 1);
    },
    widthdrawCoins: async () => {
        return await mainContract?.sendWithdrawalRequest(toNano("0.05"), toNano("1"), sender);
    },
    sendDeposit: async () => {
        mainContract?.sendDeposit(toNano("1"), sender);
    },
    ...contractData,
  };
}