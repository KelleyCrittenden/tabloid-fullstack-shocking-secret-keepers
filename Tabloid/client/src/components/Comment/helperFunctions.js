export function currentDateTime(currentDate) {
    let generateCurrentDateTime;

    //get today's date
    let date = new Date(currentDate).getDate();
    //get current month
    let month = new Date(currentDate).getMonth() + 1;
    //get current year
    let year = new Date(currentDate).getFullYear();

    //this will generate string of the current month, date, year
    generateCurrentDateTime = month + "/" + date + "/" + year

    return generateCurrentDateTime
}