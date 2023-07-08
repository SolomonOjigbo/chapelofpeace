export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getErrorMessage = (error) => {
  let message = error.message;
  if (error.response) {
    message = error.response.data.message;
  }
  return message.toString();
};

export const isEmpty = (obj) => {
  for (const key in obj) return false;
  return true;
};


export const lowerCase = (str) => {
  str = !str ? "" : str;
  return str.toString().toLowerCase();
};

export const isSuperAdmin = ['super', 'admin']

export const isSuper = ['super']

export const checkSuperAdmin = role => {
  return isSuperAdmin.includes(lowerCase(role))
}

export const uniqueNumber = () => {
  const rand = Math.random().toString();
  const randString = rand.split(".").toString().substring(2, 7);

  return Number(randString);
};


export const numberWithCommas = (num)=>{
  return num?.toLocaleString('en-US') || '';
}

export const isAuthPath = (pathName) => {
  console.log("This is my patyhName>>>",pathName)
  return pathName.includes('/dashboard') ? true : false;
}


