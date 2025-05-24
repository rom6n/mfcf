import { Address, beginCell, Cell, type Contract, contractAddress, type ContractProvider, type Sender, SendMode } from "@ton/core";

export type MainContractConfig = {
    number: number;
    address: Address;
    owner: Address;
};

export function mainContractConfigToCell(config: MainContractConfig): Cell {
  return beginCell().storeUint(config.number, 32).storeAddress(config.address).storeAddress(config.owner).endCell();
}

export class MainContract implements Contract {
    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };

    constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    static createFromConfig(config: MainContractConfig, code: Cell, workchain = 0) {
        const data = mainContractConfigToCell(config);
        const init = { code, data };
        const address = contractAddress(workchain, init);

        return new MainContract(address, init);
    }

    async sendIncrement(
        provider: ContractProvider,
        sender: Sender,
        value: bigint,
        increment_by: number
    ) {
        const msg_body = beginCell()
            .storeUint(1, 32) // OP код
            .storeUint(increment_by, 32) // насколько увеличить счетчик
            .endCell();

        await provider.internal(sender, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: msg_body,
        });
    }

    async getData(provider: ContractProvider) {
        const {stack}  = await provider.get("get_contract_storage_data", []);
        return {
            number: stack.readNumber(),
            recent_sender: stack.readAddress(),
            owner: stack.readAddress(),
        };
    }

    async getBalance(provider: ContractProvider) {
        const {stack} = await provider.get("balance", []);
        return {
            number: stack.readNumber(),
        }
    }

    async sendDeposit(provider: ContractProvider, value: bigint, sender: Sender) {
        const body = beginCell().storeUint(2, 32).endCell();
        await provider.internal(sender, {
            value: value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: body,
        });
    }

    async sendNoDeposit(provider: ContractProvider, value: bigint, sender: Sender) {
        await provider.internal(sender, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(999, 32).endCell(),
        });
    }

    async sendWithdrawalRequest(provider: ContractProvider, value: bigint, amount: bigint, sender: Sender) {
        const body = beginCell().storeUint(3, 32).storeCoins(amount).endCell();
        await provider.internal(sender, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: body,
        });
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(999, 32).endCell(),
        });
}
}