export const DateTimeFormatter = (DateTime: any) => {
  try {
    const dateTime = new Date(DateTime);
    let [year, month, date, hours, minutes]: any = [dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes()];

    if (month + 1 <= 9) {
      month = '0' + (month + 1);
    } else {
      month = month + 1;
    }
    if (date <= 9) {
      date = '0' + date;
    }
    if (hours <= 9) {
      hours = '0' + hours;
    }
    if (minutes <= 9) {
      minutes = '0' + minutes;
    }

    return `${year}-${month}-${date}T${hours}:${minutes}:00.000Z`;
  } catch ({ message }: any) {
    throw { message };
  }
};
export const ReceivedDateTimeFormatter = (DateTime: any) => {
  try {

    const DateTimeConverted = DateTime.slice(0,-1)
    const dateTime = new Date(DateTimeConverted);
    let [year, month, date, hours, minutes]: any = [dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes()];

    if (month + 1 <= 9) {
      month = '0' + (month + 1);
    } else {
      month = month + 1;
    }
    if (date <= 9) {
      date = '0' + date;
    }
    if (hours <= 9) {
      hours = '0' + hours;
    }
    if (minutes <= 9) {
      minutes = '0' + minutes;
    }

    return `${year}-${month}-${date}T${hours}:${minutes}:00.000`;
  } catch ({ message }: any) {
    throw { message };
  }
};

export const DateTimeView = (DateTime: any) => {
  try {
    const dateTime = new Date(DateTime);
    const dateOptions: any = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' };
    return dateTime.toLocaleString('en-US', dateOptions);
  } catch ({ message }: any) {
    throw { message };
  }
};
export const DateTimeViews = (DateTime: any) => {
  try {
    const dateTime = new Date(DateTime);
    const dateOptions: any = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return dateTime.toLocaleString('en-US', dateOptions);
  } catch ({ message }: any) {
    throw { message };
  }
};
export const DateView = (DateInput: any) => {
  try {
    const date = new Date(DateInput);
    const dateOptions: any = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleString('en-US', dateOptions);
  } catch ({ message }: any) {
    throw { message };
  }
};

export const SignUpDateTimeFormatter = (DateTime: any) => {
  try {
    const dateTime = new Date(DateTime);
    let [year, month, date]: any = [dateTime.getFullYear(), (dateTime.getMonth() + 1).toString().padStart(2, '0'), dateTime.getDate().toString().padStart(2, '0')];
    return `${year}-${month}-${date}`;
  } catch ({ message }: any) {
    throw { message };
  }
};
