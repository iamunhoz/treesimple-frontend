# For Users
If you are a linguist, professional, student or enthusiast, maybe you can find this application too simple, or too innacurate. If this happens to be your evaluation of this software, the author, who is a linguistics student and an amateur programmer and will always keep this as an open source software, is looking for feedback about things that could improve this application. If you could be so kind, send an e-mail explaining how was your experience and what you probably missed when using it.

## How to use
1. Write your sentence on the text box and click on **Start Branching**
2. Hover your mouse at the spaces between words. It will make a light blue bar appear.
3. If you click on this light blue bar, the sentence will be branched at that specific point, and two sub phrases will appear bellow.
4. Each child phrase will have the same behaviour as its parent phrase, until there is only one lexical item in the phrase.
5. At any time, you can click on the generic **XP** pin to change the phrase type.
+ Note: It's a planned feature update do include not only Phrase Types, but also Lexical Types among options.
# For Developers

## General Information

|   |   |
|---|---|
|starter|vite|
|framework|React-TS|
|Components library|Material-UI|
|styling|react-jss hooks|
|Demo|https://noam.netlify.app|
|License| GPL

## Main Purpose
Noam is a Simplified Syntax Tree Generator. It is named after a famous proponent linguist of this theory, Noam Chomsky. And it is called _Simplified_ because there is a lot more to be said about Syntax Trees than what it is included in this software. If your goal is to use a comprehensive tool for academic research, The author of this software advises you to opt for the excelent [TreeForm](https://sourceforge.net/projects/treeform/) or look for [LateX Solutions](https://duckduckgo.com/?q=latex+syntax+tree).

It was chosen to be _Simplified_ in a effort to make it an __introductory educational tool__ for this theory. The author had in mind not linguists doing their work, but teachers that would like to use Syntax Trees in their children or teenager classrooms.

## Definition of a Syntax Tree
According to [this](https://www.geeksforgeeks.org/syntax-tree-natural-language-processing/) article of the site GeeksforGeeks:
>A Syntax tree or a parse tree is a tree representation of different syntactic categories of a sentence. It helps us to understand the syntactical structure of a sentence.

And a graphical example, taken from the article above:

![Syntax Tree](https://media.geeksforgeeks.org/wp-content/uploads/20200329230855/Syntax1.png)


## The Role of React
Besides the standard Components related to a web application layout, the most important component is the __\<Phrase>__ component. 
It is composed of two inter related sub Components:

### __\<PhraseWrapper>:__
It is the the component that is finally exposed as the _default export_ of this module. It takes as _props_ three parameters: **x** and **y** coordinates and **words**, which is an **string array** containing the segments of the sentence, taking a basic (but linguistically innacurate) rule for separation: **spaces**.