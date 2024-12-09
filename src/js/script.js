'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

const cookieModal = select('.cookie-modal');
const settingModal = select('.setting-modal');
const acceptButton = select('.accept-btn');
const settingsButton = select('.settings-btn');
const saveButton = select('.save-btn');
const browserToggle = select('#browser-toggle');
const osToggle = select('#os-toggle');
const screenHeightToggle = select('#screen-height-toggle');
const screenWidthToggle = select('#screen-width-toggle');

function setCookie(name, value, seconds) {
  const date = new Date();
  date.setTime(date.getTime() + seconds * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

// Used Chat-GBT and Google to help get code for this function
// This function looks for a specific cookie by its name, logs its value if 
// found, and returns true; otherwise, it logs "Cookies not found" and returns false.
function getCookie(name) {
  const decodedCookies = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookies.split(';');
  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim();
    if (cookie.indexOf(name + '=') === 0) {
      console.log(`${name} = ${cookie.substring(name.length + 1, cookie.length)}`);
      return true;
    }
  }
  console.log('Cookies not found');
  return false;
}

// Used Chat-GBT and prevos project to help get code for the following function
function getBrowserName() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  } else if (userAgent.indexOf('Firefox') > -1) {
    return 'Firefox';
  } else if (userAgent.indexOf('Safari') > -1) {
    return 'Safari';
  } else if (userAgent.indexOf('Edge') > -1) {
    return 'Edge';
  } else {
    return 'Unknown';
  }
}

function getOSName() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Windows NT') > -1) {
    return 'Windows';
  } else if (userAgent.indexOf('Mac OS X') > -1) {
    return 'Mac OS';
  } else if (userAgent.indexOf('Linux') > -1) {
    return 'Linux';
  } else {
    return 'Unknown';
  }
}

function getScreenDimensions() {
  return {
    width: window.screen.width,
    height: window.screen.height,
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const cookiesAccepted = getCookie('cookies_accepted');

  if (cookiesAccepted === true) {
    cookieModal.style.display = 'none';
    getCookie('browser') === true
      ? (browserToggle.checked = true)
      : (browserToggle.checked = false);
    getCookie('os') === true
      ? (osToggle.checked = true)
      : (osToggle.checked = false);
    getCookie('screenHeight') === true
      ? (screenHeightToggle.checked = true)
      : (screenHeightToggle.checked = false);
    getCookie('screenWidth') === true
      ? (screenWidthToggle.checked = true)
      : (screenWidthToggle.checked = false);
  }
});

listen('click', acceptButton, () => {
  setCookie('cookies_accepted', 'true', 15);

  const browserEnabled = browserToggle.checked;
  const osEnabled = osToggle.checked;
  const screenHeightEnabled = screenHeightToggle.checked;
  const screenWidthEnabled = screenWidthToggle.checked;

  setCookie('browser', browserEnabled ? getBrowserName() : 'Rejected', 15);
  setCookie('os', osEnabled ? getOSName() : 'Rejected', 15);
  setCookie(
    'screenHeight',
    screenHeightEnabled ? getScreenDimensions().height : 'Rejected',
    15
  );
  setCookie(
    'screenWidth',
    screenWidthEnabled ? getScreenDimensions().width : 'Rejected',
    15
  );

  getCookie('browser') === true
    ? (browserToggle.checked = true)
    : (browserToggle.checked = false);
  getCookie('os') === true
    ? (osToggle.checked = true)
    : (osToggle.checked = false);
  getCookie('screenHeight') === true
    ? (screenHeightToggle.checked = true)
    : (screenHeightToggle.checked = false);
  getCookie('screenWidth') === true
    ? (screenWidthToggle.checked = true)
    : (screenWidthToggle.checked = false);

  browserToggle.checked = true;
  osToggle.checked = true;
  screenHeightToggle.checked = true;
  screenWidthToggle.checked = true;

  cookieModal.style.display = 'none';
});

listen('click', settingsButton, () => {
  settingModal.style.display = 'flex';
});

listen('click', saveButton, () => {
  settingModal.style.display = 'none';
  cookieModal.style.display = 'flex';
});
