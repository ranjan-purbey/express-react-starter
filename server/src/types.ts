import { buildDataloaders } from "./buildDataloaders";

export type Await<T> = T extends Promise<infer U> ? U : T;

export type GraphqlContext = {
  getDataLoader: Await<ReturnType<typeof buildDataloaders>>;
};
