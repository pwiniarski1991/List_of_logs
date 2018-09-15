function isCurrentDateNewer(old, current, rev) {
    const isNewer = rev
    ? Date.parse(current) > Date.parse(old)
    : Date.parse(current) < Date.parse(old)
    return isNewer;
}

export const sortItems = (data, field, reverse=false, compare = null) => {
    let i =1,x,j;
    while(i < data.length) {
        x=data[i];
        j=i-1;
        while( j >= 0 && isCurrentDateNewer(x[field], data[j][field], reverse)) {
            data[j+1] = data[j];
            j=j-1;
        }
        data[j+1] = x;
        i = i + 1;
    }
    return data;
}

export const getLogs = (url) => {
    return fetch(url)
    .then(response => response.json());
}