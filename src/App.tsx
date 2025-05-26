import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "@ton/core";

function App() {
  const {
    contract_address,
    counter,
    recent_sender,
    owner,
    contract_balance,
    sendIncrement,
    widthdrawCoins,
    sendDeposit,
  } = useMainContract();
  const { connected } = useTonConnect();

  return (
    <div>
      <TonConnectButton />

      <div className="container">
        <div>
          <h3>Contract Data:</h3>
          <b>Our contract Address:</b>
          <div className="Hint">{contract_address  ?? "Loading..."}</div>
          <hr />

          <b>Our contract Owner:</b>
          <div className="Hint">{owner?.toString().slice(0, 5)+"..."+owner?.toString().slice(20, )}</div>
          <hr />

          {contract_balance && (
            <>
              <b>Our contract Balance:</b>
              <div className="Hint">{fromNano(contract_balance)  ?? "Loading..."}</div>
              <hr />
            </>
          )}

          {recent_sender && (
            <>
              <b>Recent sender:</b>
              <div className="Hint">{recent_sender?.toString().slice(0, 5)+"..."+recent_sender?.toString().slice(20, )}</div>
              <hr />
            </>
          )}

          <>
            <b>Counter Value:</b>
            <div>{counter ?? "Loading..."}</div>
          </>
        </div>
        <div>
          <h3>Contract actions: </h3>
          {connected ? (
            <>
              <p>Increment contract balance by 1 TON, with 0.05 TON as a comission</p>
              <button onClick={sendIncrement}>Increment</button>
              <hr />

              <p>Withdraw the TON from contract</p>
              <button onClick={widthdrawCoins}>Withdraw 1 TON</button>
              <hr />
              
              <p>Withdraw the TON from contract</p>
              <button onClick={sendDeposit}>Deposit 1 TON</button>
              <hr />
            </>
          ) : (
            <p>Connect wallet to start action</p>
          )}
        </div>
        <div>
          <a
            href="https://testnet.tonscan.org/address/EQBnodt3mWVa3p3hKj4f_5f6Sx2XSz6ihqrzlCRpsY97SItk"
            target="_blank"
          >
            explorer
          </a>
          <br />
          <a href="https://github.com/rom6n" target="_blank">
            github
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;