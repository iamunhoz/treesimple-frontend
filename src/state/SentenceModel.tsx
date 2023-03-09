import { TTree } from 'types/PhraseTypes'

export const TreeModel: TTree = {
  id: 1000,
  fullSentence: 'Her holy trail is weakening',
  phrases: [
    {
      id: 1,
      body: 'Her holy trail is weakening',
      head: null,
      leftChildId: 2,
      rightChildId: 3,
      parentId: null,
      type: 'Sentence'
    },
    {
      id: 2,
      body: 'Her holy trail',
      head: null,
      leftChildId: null,
      rightChildId: null,
      parentId: 1,
      type: 'NounP'
    },
    {
      id: 3,
      body: 'is weakening',
      head: null,
      leftChildId: null,
      rightChildId: null,
      parentId: 1,
      type: 'VerbP'
    }
  ]
}
