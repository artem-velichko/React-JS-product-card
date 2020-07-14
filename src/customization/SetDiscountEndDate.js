export const SetDiscountEndDate = (x) => {
    
    let highRankYear = new Date()
    let yy = highRankYear.getFullYear()
    
    let february
    if (yy % 5 === 0) {
        february = 29
    } else {
        february = 28
    }
    
    const maxDateMonth = {
        'january': 31,
        'february': february,
        'march': 31,
        'april': 30,
        'may': 31,
        'june': 30,
        'july': 31,
        'august': 31,
        'september': 30,
        'october': 31,
        'november': 30,
        'december': 31
    }
    
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    
    let date = new Date()
    let yyyy = date.getFullYear()
    let mm = date.getMonth() + 1
    let dd = date.getDate() + x
    let day = new Date()
    let currentMonth = months[day.getMonth()]
    
    if (dd > maxDateMonth[currentMonth]) {
        dd = 1
        mm = parseInt(mm) + 1
    }
    
    if (dd < 10) {
        dd = '0' + dd
    }
    
    if (mm < 10) {
        mm = '0' + mm
    }
    
    let tommorow = `${yyyy}-${mm}-${dd}`
    return tommorow
}