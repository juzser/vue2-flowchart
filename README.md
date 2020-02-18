# Vue2-flowchart


## Introduction

- Vue2-flowchart is a simple plugin help to make simple flow charts
- Vue2-flowchart use vanilaJS and [Vuejs](https://vuejs.org/v2/guide/)

## Install

npm:
	`npm install vue2-flowchart`
or yarn: 
	`yarn add vue2-flowchart`

## Usage

Import & register component:
```javascript
import { VueFlowChart } from 'vue-bot-ui'
export default {
  components: {
    VueFlowChart,
  },
  ...
}
```

## Props

List props to use in the component:


|Name   |Type  |Default      |Description                           |
|---    |---   |---          |---                                   |
|nodes  |Array |[]           |Array of flow-chart                   |
|links  |Array |[]           |Array link between nodes of flow-chart|
|options|Object|Example below|Some options to customize UI          |


## Options

Comming soon

## Events

List events which the component emit:

|Name              |Returned   |Description   |
|---               |---|---|
|nodeSelected      |id (of node)   |Fire when user select a node   |
|nodeDeleted       |id (of node)   |Fire when user hit 'x' of node    |
|updatePositionNode|node           |Fire when user drag node   |
|linkSelected      |id (of link)   |Fire when user select a link   |
|linkDeleted       |id (of link)   |Fire when user hit 'x' of link   |
|editLink          |link           |Fire when user update link from a node   |
|addLink           |link           |Fire when user create link from node or option of node   |
|optionSelected    |index of option|Fire when select an option of node   |

## Example

1.  Nodes
- Text node:

```json
{
	id: 1,
	type: 'text',
	label: 'text node 1',
	text: 'Hello John',
	centerX: 200,
	centerY: 300
}
```

- Button node:

```json
{

	id: 2,
	type: 'button',
	label: 'button node',
	text: 'I love you 3000',
	centerX: 300,
	centerY: 100,
	options: [
		{
			title: 'option 1',
			value: 'op1'
		},
		{
			title: 'option 2',
			value: 'op2'
		}
	]

}
```

- NOTE: Now, type of node only: `text` or `button`

2. Links

```json
{
	id: 1,
	from: 1,
	to: 1,
	option: null
}
```
## Developers / Build

```
# Clone repo
git clone https://github.com/JuzSer/vue2-flowchart.git

# Install packages
yarn

# Development & Demo - http://localhost:1902
yarn dev

# Build main library
yarn build
```