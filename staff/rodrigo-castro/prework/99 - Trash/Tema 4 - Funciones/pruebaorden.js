const myRankingToSort = [[pepe, 96], [abel, 91], [miriam, 98], [jazmin, 94]];

const sortedData = myRankingToSort.sort((a, b) => b[1] - a[1]);

console.log(sortedData);