export interface IUserRegistrationPostData {
  email: string;
  password: string;
  name: string;
};

export interface IUserRegistrationResponseData {
  sucess: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
};

export interface IUserLoginPostData {
  [key: string]: string;
};

export interface IUserLogoutPostData {
  token: string;
};

export interface IUserFogotPasswordPostData {
  [key: string]: string;
};

export interface IUserResetPasswordPostData {
  password: string;
  token: string;
};

export interface IUserPatchData {[key: string]: string};

export interface IUserUpdateResponseData {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};