export const loadJSON = key =>
    key && JSON.parse(localStorage.getItem(key));

export const saveJSON = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data));

export const arrFilter = (list) => list.filter(item => item.name !== 'Total');

export const arrOrderFilter = (list) => {
     const itemList = list.filter(item => item.name !== 'Total');
     return itemList
     // const winner = itemList.filter(item => item.winner == 'true');
     // const removeWinnerList = itemList.filter(item => item.winner !== 'true');
     // return [...removeWinnerList, winner]
}

export const winner = (list) => {
     return list.filter(item => item.winner == true);
}