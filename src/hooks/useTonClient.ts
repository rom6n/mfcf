import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient, TonClient4 } from '@ton/ton';
import { useAsyncInitialize } from './useAsyncInitialize';

export function useTonClient() {
  return useAsyncInitialize(
    async () =>
      new TonClient({
        endpoint: await getHttpEndpoint({ network: 'testnet' }),
      })
  );
}