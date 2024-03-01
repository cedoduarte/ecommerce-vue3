export const fixDateFormat = (dateInput: string): string => {
    const modifiedString = dateInput.substring(0, dateInput.indexOf('T'));
    return modifiedString;
}

export const formatAsCurrency = (currencyValue: number) => {
    // Use toLocaleString to format the number as Mexican Pesos
    return currencyValue.toLocaleString("es-MX", {
        style: "currency", 
        currency: "MXN" 
    });
}