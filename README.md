# What is this?

This is a plugin for [@jointly/cache-candidate](https://github.com/JointlyTech/cache-candidate) that provides types needed to create a cache-candidate plugin.


## How To Create a Plugin

To create a plugin, you have to declare a variable of type `CacheCandidatePlugin`.  
This variable must be exported, so that the plugin can be loaded by cache-candidate.

```ts
import { CacheCandidatePlugin } from '@jointly/cache-candidate-plugin-base';

export const myPlugin: CacheCandidatePlugin = {
  // ...
};
```

The `CacheCandidatePlugin` is a type expecting an object composed of the following properties:
- `name`: The name of the plugin. This name will be used to identify the plugin in the logs.
- `hooks`: An array of `ActionableHook` that will be executed by cache-candidate.  
  See [Hooks](#ActionableHook) for more information.

  ## Glossary

### Hooks

#### ActionableHook

An ActionableHook is a hook that can be executed by cache-candidate.  
It is composed of the following properties:
- `hook`: The hook to execute.  
  See [Hooks](#AvailableHooks) for more information about the available hooks.
- `action`: The action to execute when the hook is triggered.  
  See [Actions](#Actions) for more information about the available actions.

#### AvailableHooks

The following hooks are available:
- `INIT`: Triggered when the cache candidate is starting.  
- `EXECUTION_PRE`: Triggered before the execution of the function/method wrapped in the cache-candidate.  
- `EXECUTION_POST`: Triggered after the execution of the function/method wrapped in the cache-candidate.
- `DATACACHE_RECORD_ADD_PRE`: Triggered before the addition of a record in the data cache.  
- `DATACACHE_RECORD_ADD_POST`: Triggered after the addition of a record in the data cache.
- `DATACACHE_RECORD_DELETE_PRE`: Triggered before the deletion of a record in the data cache.  
- `DATACACHE_RECORD_DELETE_POST`: Triggered after the deletion of a record in the data cache.
- `CACHE_HIT`: Triggered when a cache hit occurs.

#### Actions

Actions are functions that are executed by the cache-candidate when a hook is triggered.    
Please, refer to the [cache-candidate docs](https://github.com/JointlyTech/cache-candidate/blob/main/README.md) for more information about the arguments and their properties.  
They take two arguments:
- `payload`: The payload of the hook. It is composed of the following properties:
  - `options`: The options of the cache-candidate.
  - `key`: The key of the function/method wrapped in the cache-candidate.
  - `keepAliveTimeoutCache`: The keep-alive timeout cache of the cache-candidate.
  - `runningQueryCache`: The running query cache of the cache-candidate.
  - `timeframeCache`: The timeframe cache of the cache-candidate.
  - `fnArgs`: The arguments of the function/method wrapped in the cache-candidate.  
  - `result`(only for `EXECUTION_POST` and `CACHE_HIT`): The result of the function/method wrapped in the cache-candidate.


# ToDo

- [ ] Specify available cache-candidate documentation paragraphs by linking to the cache-candidate when open-sourced and README ready.