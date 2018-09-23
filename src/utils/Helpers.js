function isCurrentDateNewer(old, current, isDesc=true) {
    let isNewer = isDesc 
    ? Date.parse(current) < Date.parse(old)
    : Date.parse(current) > Date.parse(old); 
    return isNewer;
}

export const sortItems = (data, field, sortOrder, compare = null) => {
    let i =1,x,j;
    if(!field) {
        return data;
    }
    while(i < data.length) {
        x=data[i];
        j=i-1;
        while( j >= 0 && isCurrentDateNewer(x[field], data[j][field], sortOrder)) {
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

export const getCommunicat = (dict, status,styleName) => {
    if(dict[status]) {
        return React.createElement(
            'span',{ key: status ,'styleName': styleName },React.createElement(dict[status], { key: status })
        );
    }
    return '';
}