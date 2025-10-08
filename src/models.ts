export type PluginPayload = {
  options: any;
  key: string;
  timeoutCache: any;
  runningQueryCache: any;
  timeframeCache: any;
  fnArgs: any[];
  result?: any;
  internals?: {
    getDataCacheRecord: ({
      options,
      key,
      HookPayload,
      staleMap
    }: {
      options: any;
      key: string;
      HookPayload: PluginPayload;
      staleMap: StaleMap;
    }) => Promise<any>;
    addDataCacheRecord: ({
      options,
      key,
      result,
      HookPayload
    }: {
      options: any;
      key: string;
      result: unknown;
      HookPayload: PluginPayload;
    }) => Promise<void>;
    deleteDataCacheRecord: ({
      options,
      key,
      HookPayload,
      result,
      staleMap,
      forceDeleteFn
    }: {
      options: any;
      key: string;
      HookPayload: PluginPayload;
      result: unknown;
      staleMap: StaleMap;
      forceDeleteFn?: boolean;
    }) => Promise<void>;
    isDataCacheRecordExpired: ({
      birthTime,
      options
    }: {
      birthTime: number;
      options: any;
    }) => boolean;
    getDataCacheKey: (...args: any[]) => string;
    getExceedingAmount: ({
      options,
      key,
      timeframeCache,
      executionTime,
      args
    }: {
      options: any;
      key: string;
      timeframeCache: any;
      executionTime: number;
      args: any[];
    }) => Promise<number>;
  };
};

export enum Hooks {
  SETUP = 'SETUP',
  INIT = 'INIT',
  EXECUTION_PRE = 'EXECUTION_PRE',
  EXECUTION_POST = 'EXECUTION_POST',
  DATACACHE_RECORD_ADD_PRE = 'DATACACHE_RECORD_ADD_PRE',
  DATACACHE_RECORD_ADD_POST = 'DATACACHE_RECORD_ADD_POST',
  DATACACHE_RECORD_DELETE_PRE = 'DATACACHE_RECORD_DELETE_PRE',
  DATACACHE_RECORD_DELETE_POST = 'DATACACHE_RECORD_DELETE_POST',
  CACHE_HIT = 'CACHE_HIT'
  //CACHE_MISS = 'CACHE_MISS',
}

export type ActionableHook = {
  hook: Hooks;
  action: (payload: PluginPayload, additionalParameters: any) => Promise<void>;
};

export type CacheCandidatePlugin = {
  name: string;
  hooks: Array<ActionableHook>;
};

export type CacheCandidatePluginAdditionalParameters = {
  additionalParameters?: {
    [key: string]: any;
  };
};

export type CacheCandidatePluginWithAdditionalParameters =
  CacheCandidatePlugin & CacheCandidatePluginAdditionalParameters;

export type StaleMap = Map<string, unknown>; // Inherited from cache-candidate
