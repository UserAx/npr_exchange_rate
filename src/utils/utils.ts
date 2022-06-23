export const getCurrentDate = () : string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
    return year+'-'+month+'-'+day;
}

export const capitalizeText = (value: string) => {
    return value.charAt(0).toUpperCase().concat(value.substring(1));
}