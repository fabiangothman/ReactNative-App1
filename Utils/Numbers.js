export const convertNumberToString = (num) => {
    if(typeof num == 'number')
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    else
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}