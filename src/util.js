function formatCurrency(num) {
    return "$" + Number(num.toFixed(1)).toLocaleString() +" ";
}

function formatTitle(title) {
    const arr = title.split(" ");
    let newTitle = "";
    for(var i =0;  arr[i] !== "/"; i++) {
        newTitle += arr[i] + " ";
    }
    newTitle += arr[i] + " " + arr[i+1];
    return newTitle;
}

module.exports = {formatCurrency, formatTitle}