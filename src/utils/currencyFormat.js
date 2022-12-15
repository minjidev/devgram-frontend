export function convertToCurrency(num, currency = "KRW", locale = "ko") {
    const formatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    });

    return formatter.format(num);
}
