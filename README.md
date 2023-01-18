# What is this?

This is a basic repository for [@jointly/cache-candidate](https://github.com/JointlyTech/cache-candidate) that provides types needed to create a cache-candidate plugin.  
This library is not meant to be used directly, but rather as a dependency for better types when creating your own plugin.  
This library is used by all [First Party Plugins](https://github.com/JointlyTech/cache-candidate#first-party-plugins) of the cache-candidate ecosystem.  
You can develop a library without using this library as this only provides some types, but we strongly recommend using it.


## How To Create a Plugin

To create a plugin, you have to declare a variable of type `CacheCandidatePlugin`.  
This variable must be exported, so that the plugin can be loaded by cache-candidate.

```ts
import { CacheCandidatePlugin, Hooks } from '@jointly/cache-candidate-plugin-base';

export const myPlugin: CacheCandidatePlugin = {
  name: 'myPlugin',
  hooks: [
    {
      hook: Hooks.INIT,
      action: async (payload, additionalParameters) => {
        // Do something
        console.log('Hooks.INIT', payload, additionalParameters);
      }
    },
    {
      hook: Hooks.EXECUTION_PRE,
      action: async (payload, additionalParameters) => {
        // Do something
        console.log('Hooks.EXECUTION_PRE', payload, additionalParameters);
      }
    },
    {
      hook: Hooks.EXECUTION_POST,
      action: async (payload, additionalParameters) => {
        // Do something
        console.log('Hooks.EXECUTION_POST', payload, additionalParameters);
      }
    },
    {
      hook: Hooks.DATACACHE_RECORD_ADD_PRE,
      action: async (payload, additionalParameters) => {
        // Do something
        console.log('Hooks.DATACACHE_RECORD_ADD_PRE', payload, additionalParameters);
      }
    },
    {
      hook: Hooks.DATACACHE_RECORD_ADD_POST,
      action: async (payload, additionalParameters) => {
        // Do something
        console.log('Hooks.DATACACHE_RECORD_ADD_POST', payload, additionalParameters);
      }
    },
    {
      hook: Hooks.DATACACHE_RECORD_DELETE_PRE,
      action: async (payload, additionalParameters) => {
        // Do something
        console.log('Hooks.DATACACHE_RECORD_DELETE_PRE', payload, additionalParameters);
      }
    },
    {
      hook: Hooks.DATACACHE_RECORD_DELETE_POST,
      action: async (payload, additionalParameters) => {
        // Do something
        console.log('Hooks.DATACACHE_RECORD_DELETE_POST', payload, additionalParameters);
      }
    },
    {
      hook: Hooks.CACHE_HIT,
      action: async (payload, additionalParameters) => {
        // Do something
        console.log('Hooks.CACHE_HIT', payload, additionalParameters);
      }
    }
  ]
};
```

In the example above, we created a plugin named `myPlugin` that logs the payload of each hook.  
The `additionalParameters` argument is an object that can be passed to the cache-candidate when loading the plugin.  

```ts
import { cacheCandidate } from '@jointly/cache-candidate';
import { myPlugin } from 'my-plugin';

const myCachedFunction = cacheCandidate(myFunction, {
  // ... options
  plugins: [
    {
      ...myPlugin,
      additionalParameters: {
        foo: 'bar'
      }
    }
  ]
});
```

If you don't need additionalParameters, you can simply pass the plugin to the cache-candidate.

```ts
import { cacheCandidate } from '@jointly/cache-candidate';
import { myPlugin } from 'my-plugin';

const myCachedFunction = cacheCandidate(myFunction, {
  // ... options
  plugins: [
    myPlugin
  ]
});
```

## API

The `CacheCandidatePlugin` is an object composed of the following properties:
- `name`: The name of the plugin. This name will be used to identify the plugin in the logs.
- `hooks`: An array of `ActionableHook` that will be executed by cache-candidate.  
  See [Hooks](#ActionableHook) for more information.

## Glossary

### Hooks

#### ActionableHook

An ActionableHook is a hook associated with an action that can be executed by cache-candidate.  
It is composed of the following properties:
- `hook`: The hook to execute.  
  See [Hooks](#AvailableHooks) for more information about the available hooks.
- `action`: The action to execute when the hook is triggered.  
  See [Actions](#Actions) for more information about the available actions.

#### AvailableHooks

All hooks are called only when the cache-candidate is executed in runtime.  
The following hooks are available:
- `INIT`: Triggered when the candidate process is initialized.  
  This gets called before any other operation is done.
- `EXECUTION_PRE`: Triggered before the execution of the function/method wrapped in the cache-candidate.  
- `EXECUTION_POST`: Triggered after the execution of the function/method wrapped in the cache-candidate.
- `DATACACHE_RECORD_ADD_PRE`: Triggered before the addition of a record in the cache.  
- `DATACACHE_RECORD_ADD_POST`: Triggered after the addition of a record in the cache.
- `DATACACHE_RECORD_DELETE_PRE`: Triggered before the deletion of a record in the cache.  
- `DATACACHE_RECORD_DELETE_POST`: Triggered after the deletion of a record in the cache.
- `CACHE_HIT`: Triggered when a cache hit occurs, before the result is returned. This also applies when a `Running Query` is returned (Please, refer to [this paragraph](https://github.com/JointlyTech/cache-candidate#cache-**stampede**) and [this paragraph](https://github.com/JointlyTech/cache-candidate/blob/main/CONTRIBUTING.md#runningquerycache) for additional information).

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
  - `result` (only for `EXECUTION_POST` and `CACHE_HIT`): The result of the function/method wrapped in the cache-candidate.