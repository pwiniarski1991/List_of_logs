function isCurrentDateNewer(old, current) {
    return Date.parse(current) > Date.parse(old)
}

export const sort = (data, field, compare = null) => {
    let newData = [];
    let temp;
    for(let {key, obj} of data) {
        for (let {index, item} of newData) {
            if(isCurrentDateNewer(obj.field,item.field)) {
                newData.splice(i,0,obj);
                break;
            }
        }
    }
}

export const filter = (logs) => {

}