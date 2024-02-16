import { PlainSentence, TreeWithCoordinates } from "@/lib/definitions"

export const exampleTreeWithCoordinates: TreeWithCoordinates = {
  sentence: {
    id: "model-2",
    phrases: [
      {
        id: "1",
        body: "this is a model sentence",
        parentId: "model",
        x: 596.5,
        y: 25,
      },
      {
        id: "leftside-dxZ09f_at_jRZ01Ndo1ye",
        body: "this is a",
        y: 100,
        x: 586.5,
        parentId: "1",
      },
      {
        id: "rightside-a-wRr8RSr1yXCrD2cX9ZA",
        body: "model sentence",
        y: 100,
        x: 704.5,
        parentId: "1",
      },
      {
        id: "leftside-ymPfhcQL60WtrWaQmdKF8",
        body: "this",
        y: 175,
        x: 576.5,
        parentId: "leftside-dxZ09f_at_jRZ01Ndo1ye",
      },
      {
        id: "rightside-PR4Y_rf6Kk4bV2GNvl5Y1",
        body: "is a",
        y: 175,
        x: 634.5,
        parentId: "leftside-dxZ09f_at_jRZ01Ndo1ye",
      },
      {
        id: "leftside-uslfbRKSaoR1ybOrdqQuD",
        body: "is",
        y: 250,
        x: 624.5,
        parentId: "rightside-PR4Y_rf6Kk4bV2GNvl5Y1",
      },
      {
        id: "rightside-ehNqA7LOKMs4iWFkgNnZ3",
        body: "a",
        y: 250,
        x: 658.5,
        parentId: "rightside-PR4Y_rf6Kk4bV2GNvl5Y1",
      },
      {
        id: "leftside-UNuK9ndG3f2PfOPG87mmn",
        body: "model",
        y: 175,
        x: 694.5,
        parentId: "rightside-a-wRr8RSr1yXCrD2cX9ZA",
      },
      {
        id: "rightside-3cuUpI9APjHtgl9jJjDk2",
        body: "sentence",
        y: 175,
        x: 764.5,
        parentId: "rightside-a-wRr8RSr1yXCrD2cX9ZA",
      },
    ],
  },
  lines: [
    { parentX: 740.5, parentY: 55, x: 640.5, y: 100 },
    { parentX: 740.5, parentY: 55, x: 788.5, y: 100 },
    { parentX: 640.5, parentY: 130, x: 600.5, y: 175 },
    { parentX: 640.5, parentY: 130, x: 658.5, y: 175 },
    { parentX: 658.5, parentY: 205, x: 636.5, y: 250 },
    { parentX: 658.5, parentY: 205, x: 664.5, y: 250 },
    { parentX: 788.5, parentY: 130, x: 724.5, y: 175 },
    { parentX: 788.5, parentY: 130, x: 812.5, y: 175 },
  ],
}

export const plainSentence: PlainSentence = {
  id: "model-2",
  phrases: [
    {
      id: "1",
      body: "this is a model sentence",
      parentId: "model-2",
    },
    {
      id: "leftside-dxZ09f_at_jRZ01Ndo1ye",
      body: "this is a",
      parentId: "1",
    },
    {
      id: "rightside-a-wRr8RSr1yXCrD2cX9ZA",
      body: "model sentence",
      parentId: "1",
    },
    {
      id: "leftside-ymPfhcQL60WtrWaQmdKF8",
      body: "this",
      parentId: "leftside-dxZ09f_at_jRZ01Ndo1ye",
    },
    {
      id: "rightside-PR4Y_rf6Kk4bV2GNvl5Y1",
      body: "is a",
      parentId: "leftside-dxZ09f_at_jRZ01Ndo1ye",
    },
    {
      id: "leftside-uslfbRKSaoR1ybOrdqQuD",
      body: "is",
      parentId: "rightside-PR4Y_rf6Kk4bV2GNvl5Y1",
    },
    {
      id: "rightside-ehNqA7LOKMs4iWFkgNnZ3",
      body: "a",
      parentId: "rightside-PR4Y_rf6Kk4bV2GNvl5Y1",
    },
    {
      id: "leftside-UNuK9ndG3f2PfOPG87mmn",
      body: "model",
      parentId: "rightside-a-wRr8RSr1yXCrD2cX9ZA",
    },
    {
      id: "rightside-3cuUpI9APjHtgl9jJjDk2",
      body: "sentence",
      parentId: "rightside-a-wRr8RSr1yXCrD2cX9ZA",
    },
  ],
}
/*   export const plainSentence: PlainSentence = {
  id: exampleTreeWithCoordinates.sentence.id,
  phrases: exampleTreeWithCoordinates.sentence.phrases.map((phrase) => ({
    id: phrase.id,
    body: phrase.body,
    parentId: phrase.parentId,
  })),
} */

export const getSentenceData = () => {
  const phrase = {
    id: "1",
    body: "this is a model sentence",
    parentId: "model",
    x: 0,
    y: 25,
  }

  phrase.x = window.innerWidth / 2 - phrase.body.length * 6

  return phrase
}
