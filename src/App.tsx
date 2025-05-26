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

  let recent_sender_str = "Загрузка...";
  if (recent_sender) {
    recent_sender_str = `${recent_sender.toString().slice(0, 5)}...${recent_sender.toString().slice(43, )}`;
  }

  let recent_counter_str = "Загрузка...";
  if (counter) {
    recent_counter_str = `${counter}`;
  }

  let owner_str = "Загрузка...";
  if (owner) {
    owner_str = `${owner}`;
  }

  let balance_str = "Загрузка...";
  if (contract_balance) {
    balance_str = `${fromNano(contract_balance)}`;
  }

  let contract_address_str = "Загрузка...";
  if (contract_address) {
    contract_address_str = `${contract_address}`;
  }


  return (
    <div>
      <TonConnectButton />

      <div className="container">
        <div>
          <h3>Данные контракта:</h3>
          <b>Адресс контракта:</b>
          <div className="Hint">
            {contract_address_str}
          </div>
          <hr />

          <b>Владелец контракта:</b> 
          <div className="Hint">
            {owner_str}
            </div> 
          <hr />

          <b>Баланс контракта:</b> 
          <div className="Hint">
            {balance_str}
            </div> 
          <hr />

          <b>Последний отправитель:</b> 
          <div className="Hint">
            {recent_sender_str}
            </div> 
          <hr />

          <>
            <b>Значение счетчика:</b>
            <div>{recent_counter_str}</div>
          </>
        </div>
        <div>
          <h3>Действия: </h3>
          {connected ? (
            <>
              <p>Увеличить счетчик на 1 за 0.05 TON</p>
              <button onClick={sendIncrement}>Увеличить</button>
              <hr />

              <p>Вывести TON из контракта</p>
              <button onClick={widthdrawCoins}>Вывести 1 TON</button>
              <hr />
              
              <p>Внести TON в контракт</p>
              <button onClick={sendDeposit}>Внести 1 TON</button>
              <hr />
            </>
          ) : (
            <p>Подключите кошелек, что бы увидеть действия</p>
          )}
        </div>
        <div>
          <a
            href="https://testnet.tonscan.org/address/EQBnodt3mWVa3p3hKj4f_5f6Sx2XSz6ihqrzlCRpsY97SItk"
            target="_blank"
          >
            See on tonscan
          </a>
          <br />
          <a href="https://github.com/rom6n" target="_blank"> 
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;