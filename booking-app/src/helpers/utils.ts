
export const isValidArray = (data: any) => {
  return data && Array.isArray(data) && data.length > 0;
};

export const isValidObject = (data: any) => {
  return typeof data === "object" && data
    ? Object.keys(data).length > 0
    : false;
};

export const isValidAmount = (value: string) => {
  const regex = /^\d*\.?\d{0,2}$/;
  return regex.test(value);
};

export const isValidPercentage = (value: string) => {
  let regex = /^\d*\.?\d{0,2}$/;
  return regex.test(value) && Number(value) <= 100;
};

export const isValidNumber = (value: string) => {
  let regex = /^[+-]?\d*(?:[.]\d*)?$/;
  return regex.test(value);
};

export function getHeader() {
  return {
    headers: {
      Accept: "application/json",
      "Accept-Language": "en",
    },
  };
}

export function getAuthHeader() {
  return {
    headers: {
      Accept: "application/json",
      "Accept-Language": "en",
    },
  };
}

export function setAndGetCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();

    if (cookie.indexOf("myCookie=") === 0) {
      return cookie.substring("myCookie=".length, cookie.length);
    }
  }

  const timestamp = new Date().getTime();
  document.cookie = `myCookie=${timestamp}; path=/`;
  return timestamp.toString();
}
