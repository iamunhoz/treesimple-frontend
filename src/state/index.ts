import { useAppStore } from './useAppStore'
import { useTreeStore } from './useTreeStore'
import { mountStoreDevtool } from 'simple-zustand-devtools'

// monitoramento do state zustand no dev tools
if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('useAppStore', useAppStore)

  mountStoreDevtool('useTreeStore', useTreeStore)
}

export { useAppStore, useTreeStore }
