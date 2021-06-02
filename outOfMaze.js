"use strict";

let maze = [
    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '+', '+', '+', '#', '+', '+', '+', '#'],
    ['#', '+', '#', '+', '#', '+', '#', '+', '#'],
    ['#', '+', '#', '+', '0', '+', '#', '+', '#'],
    ['#', '+', '#', '+', '+', '#', '#', '#', '#'],
    ['#', '+', '+', '+', '+', '#', '#', '#', '#'],
    ['#', '+', '+', '#', '+', '#', '#', '#', '#'],
    ['#', '+', '#', '#', '#', '#', '#', '#', '#'],
]

function outOfMaze(maze) {

    class Node {
        constructor(i, j, parent) {
            this.i = i;
            this.j = j;
            this.parent = parent;
            this.position = `${i}${j}`
        }
    }

    let visited = {};
    let notVisited = new Set();
    let way = [];

    let iStart = maze.findIndex(elem => elem.includes('0'));
    let jStart = maze[iStart].indexOf('0');

    let startNode = new Node(iStart, jStart, null);

    notVisited.add(startNode);

    let finishNode = step(startNode);

    if (finishNode) {
        createWay(finishNode)
        return way.reverse();
    } else {
        return 'here is no way to escape'
    }

    function step(node) {

        if (notVisited.size === 0) return false;
        else if (node.i === 0 || node.j === 0 || node.i === maze.length - 1 || node.j === maze[0].length - 1) return node;

        if (maze[node.i + 1][node.j] !== '#' && !(`${node.i + 1}${node.j}` in visited)) {
            notVisited.add(new Node(node.i + 1, node.j, node.position))
        };
        if (maze[node.i - 1][node.j] !== '#' && !(`${node.i - 1}${node.j}` in visited)) {
            notVisited.add(new Node(node.i - 1, node.j, node.position));
        };
        if (maze[node.i][node.j + 1] !== '#' && !(`${node.i}${node.j + 1}` in visited)) {
            notVisited.add(new Node(node.i, node.j + 1, node.position));
        };
        if (maze[node.i][node.j - 1] !== '#' && !(`${node.i}${node.j - 1}` in visited)) {
            notVisited.add(new Node(node.i, node.j - 1, node.position));
        };

        notVisited.delete(node);
        visited[node.position] = node;

        return step(Array.from(notVisited)[0]);
    }

    function createWay(node) {

        let parent = visited[node.parent];

        if(!parent) return
        
        if (parent.i === node.i) {
            parent.j > node.j ? way.push('left') : way.push('right');
        } else {
            parent.i > node.i ? way.push('top') : way.push('bottom')
        }
        
        createWay(parent)
    }
}

console.log(outOfMaze(maze))

