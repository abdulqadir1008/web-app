import Cookies from 'js-cookie';

const setCookie = (cookieName: any, token: any) => {
  // Cookies.set(cookieName, token, {
  //   expires: 10,
  //   secure: true
  // });
  const d = new Date();
  d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cookieName + "=" + token + ";" + expires + ";path=/";
};
const getCookie = (cookieName: any): string | null => {
  // const cookieValue = Cookies.get(cookieName);
  // return cookieValue ? cookieValue : null;

  let name = cookieName + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
const removeCookie = (cookieName: any) => {
  document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
 // return Cookies.remove(cookieName);
};

export { setCookie, getCookie, removeCookie };
