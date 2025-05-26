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
          <h3>Данные контракта:</h3>
          <b>Адресс контракта:</b>
          <div className="Hint">
            {contract_address ?
              `${contract_address.slice(0, 5)}.....${contract_address.slice(43, )}` 
              : "Загрузка..." 
              }
          </div>
          <hr />

          <b>Владелец контракта:</b> 
          <div className="Hint">
            {owner ?
              `${owner.toString().slice(0, 5)}.....${owner.toString().slice(43, )}`  
              : "Загрузка..."
            }
            </div> 
          <hr />

          <b>Баланс контракта:</b> 
          <div className="Hint">
            {contract_balance ?
              `${fromNano(contract_balance)}`  
              : "Загрузка..."
            }
            </div> 
          <hr />

          <b>Последний отправитель:</b> 
          <div className="Hint">
            {recent_sender ?
              `${recent_sender.toString().slice(0, 5)}.....${recent_sender.toString().slice(43, )}`  
              : "Загрузка..."
            }
            </div> 
          <hr />

          <>
            <b>Значение счетчика:</b>
            <div>{counter ?? "Загрузка..."}</div>
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