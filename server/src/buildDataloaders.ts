import DataLoader, { BatchLoadFn, Options } from "dataloader";
import { ensureConnection } from "./database";

export const buildDataloaders = async () => {
  await ensureConnection();
  const _dataloaders = new Map<BatchLoadFn<any, any>, DataLoader<any, any>>();

  return <K, V>(batchLoadFn: BatchLoadFn<K, V>): DataLoader<K, V> => {
    let dataloader = _dataloaders.get(batchLoadFn);
    if (!dataloader) {
      dataloader = new DataLoader(batchLoadFn);
      _dataloaders.set(batchLoadFn, dataloader);
    }
    return dataloader;
  };
};
