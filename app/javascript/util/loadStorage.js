export const loadJSON = key =>
    key && JSON.parse(localStorage.getItem(key));

export const removeJSON = key =>
    key && localStorage.removeItem(key);

export const saveJSON = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data));

export const arrFilter = (list) => list.filter(item => item.name !== 'Total');

export const arrOrderFilter = (list) => {
     const itemList = list.filter(item => (item.name !== 'Total' && item.name !=='Actions' && item.name !== 'total'));
     return itemList
}

export const winner = (list) => {
     return list.filter(item => item.winner == true);
}