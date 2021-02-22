module.exports = {
    format_time: (time) => {
        let hour = new Date(time).getHours();
        let minutes = new Date(time).getMinutes();
        let amOrPm

        switch (true) {
            case (hour === 0):
                hour = 12;
                amOrPm = 'AM';
                break;
            case (hour > 0 && hour < 12):
                amOrPm = 'AM';
                break;
            case (hour === 12):
                amOrPm = 'PM';
                break;
            case (hour > 12):
                hour -= 12;
                amOrPm = 'PM'
            };

        if (minutes === 0) {
            minutes = '00'
        };
        if (minutes < 10) {
            minutes = `0${minutes}`
        };
        
        return `${hour}:${minutes} ${amOrPm}`
    },
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${
            new Date(date).getDate()}/${
            new Date(date).getFullYear()}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
    
        return word;
    }
};