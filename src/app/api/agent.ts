import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { CorporateLoginFormValues, CustomerLoginFormValues, IRefreshToken, IUserFormValues, IValidOTP } from "../models/user";
import jwt_decode from "jwt-decode";
import { CustomerRegistrationFormValues, ICustomer, SecurityQuestion } from "../models/customer";
import { DeleteRoleFormValues, IRole, IUserRoleDetails, RoleFormValues, UserRoleUpdateFormValues } from "../models/role";
import { BVNVerification, DSRCheck, OTPRegVerification, SafAccountVerification,TenPercentCheck } from "../models/verification";
import { CreateFinance, DocumentFiles } from "../models/finance";

// axios.defaults.headers['Content-Type'] = 'application/json'

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");

    if (token) {
      const decoded = JSON.parse(JSON.stringify(jwt_decode(token!))); 
      // Get Current Date Time
      const date = new Date(0);

      // Convert EXp Time to UTC
      let tokenExpDate = date.setUTCSeconds(decoded.exp);

      // If Value of Token time greter than

      if (tokenExpDate.valueOf() > new Date().valueOf()) {
        config.headers!.Authorization = `Bearer ${token}`;
      } else {
        window.localStorage.removeItem("jwt");
        window.localStorage.removeItem("refreshToken");
        window.localStorage.removeItem("mToken");
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("profileStatus");
        history.push("/");
        toast.info("Your session has expired, please login again");
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  // console.log(error)
  if (error.message === "Network Error" || !error) {
    toast.error("Network error");
  }

  const { status, config, headers } = error.response;
  const headerContent: string = `${headers["www-authenticate"]}`;
  // console.log(error.response);

  // const originalRequest = error.config;
  // console.log(originalRequest);

  if (status === 404) {
    // history.push("/notfound");
    throw error.response
  }
  if (
    status === 401 &&
    // window.localStorage.getItem("jwt") === null
    headerContent.includes('Bearer error="invalid_token"')
  ) {
    // console.log(headerContent)
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("profileStatus");
    history.push("/");
    toast.info("Your session has expired, please login again");
  }
  if (status === 204) {
    toast.info("no content");
  }
  if (status === 400 && config.method === "get") {
    history.push("/notfound");
  }
  if (status === 204 && config.method === "get") {
    history.push("/notfound");
  }
  if (status === 400 && config.method === "post") {
    toast.error("Problem Submitting data");
  }
  if (status === 500) {
    toast.error("Server error ");
  }
  // toast.error(error.message)
  throw error
});

const responseBody = (response: AxiosResponse) => response.data;



const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, request: any) => {
        return axios
      .post(url, request, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },

  uploadFinanceDocument: (url: string, request: DocumentFiles) => {
    let formData = new FormData();
    formData.append("RequestId", String(request.RequestId));
    formData.append("AllocationLetter", request.AllocationLetter);
    formData.append("TradingYears", request.TradingYears);
    formData.append("StateOfAccount", request.StateOfAccount);
    formData.append("ReferenceLetter", request.ReferenceLetter);
    formData.append("BoardResolution", request.BoardResolution);
    return axios
  .post(url, formData, {
    headers: { "Content-type": "multipart/form-data" },
  })
  .then(responseBody);
},
};



const User = {
  current: (id: IRefreshToken): Promise<any> =>
    requests.post(`/AdminAuthentication/RefreshToken`, id),
  login: (user: CustomerLoginFormValues): Promise<any> =>
    requests.post(`/Customer/login-customer`, user),
  corporate_login: (user: CorporateLoginFormValues): Promise<any> =>
    requests.post(`/Admin/corporate-login`, user),
  validateMToken: (details: IValidOTP): any =>
    requests.post(`/Admin/validate-mtoken`, details),
  logoff: (id: string) => requests.get(`/AdminAuthentication/AdminLogOff`),
  
};



const Verification = {
  verify_saf_account: (request: SafAccountVerification): Promise<any> =>
    requests.post(`/Verification/saf-account-verification`, request),
  verify_saf_otp:(request: OTPRegVerification): Promise<any> =>
  requests.post(`/Verification/confirm-saf-otp`, request),
  verify_otp:(request: OTPRegVerification): Promise<any> =>
  requests.post(`/Verification/confirm-otp`, request),
  verify_tin: (request: string): Promise<any> =>
    requests.get(`/Verification/tin-verification?tin=${request}`),
  verify_bvn: (request: BVNVerification): Promise<any> =>
    requests.post(`/Verification/bvn-verification`, request),
  credit_check: (): Promise<any> =>
    requests.post(`/Verification/credit-check`, {}),
  corporate_credit_check: (): Promise<any> =>
    requests.post(`/Verification/corporate-credit-check`, {}),
  dsr_check: (request: DSRCheck): Promise<any> =>
    requests.post(`/Verification/dsr-check`, request),
  ten_percent_check: (request: TenPercentCheck): Promise<any> =>
    requests.post(`/Verification/ten-percent-check`, request),
};

const Coupon = {
  generate_coupons: (request: any): Promise<any> =>
    requests.post(`/Finance/CreateNewFinanceApplication`, request),
  document_upload: (request: DocumentFiles): Promise<any> =>
    requests.uploadFinanceDocument(`/Finance/DocumentUpload`, request),
};
const Customer = {
  confirmEmail: (): any =>
    requests.get(
      `/Customer/confirm-email`
    ),
  getSecurityQuestions: (): Promise<SecurityQuestion[]> =>
    requests.get(
      `/Customer/SecurityQuestion`
    ),
  register: (customer: CustomerRegistrationFormValues): Promise<any> =>
    requests.post(`/Customer/create-account`, customer),
  getRegisteredCustomer: (email: string): any =>
    requests.get(`/Customer/GetCustomerRegistration?EmailAddress=${email}`),
  deleteCustomer: (Id: number): Promise<any> =>
    requests.del(`/Customer/delete?Id=${Id}`),
};


const Stall = {
  get_stalls: (): Promise<any[]>  =>
    requests.get(
      `/Stall/get-stalls`
    ),
  // updatePackage: (Package: IPackage): Promise<any> =>
  //   requests.put(`/AltsubCardSubscriptionTypes/UpdateAltsubCardSubscriptionTypes`, Package),
  // editPackage: (Package: StallFormValues): Promise<any> =>
  //   requests.put(`/AltsubCardSubscriptionTypes/UpdateAltsubCardSubscriptionTypes`, Package),
  // deletePackage: (Id: number): Promise<any> =>
  //   requests.del(`/AltsubCardSubscriptionTypes/delete?Id=${Id}`),
};



const Role = {
  getAllRoles: (): Promise<any[]> =>
    requests.get(
      `/Role/Getallrole`
    ),
  getAllUserRoles: (): any =>
    requests.get(
      `/UserRole/GetAll`
    ),
  activateDeactivateRole: (user: UserRoleUpdateFormValues): Promise<any> =>
  requests.post(`/UserRole/ActivateDeactivate`, user),
  updateUserRole: (user: UserRoleUpdateFormValues): Promise<any> =>
    requests.post(`/UserRole/update`, user),
  verifyUser: (user: IUserRoleDetails): Promise<any> =>
    requests.post(`/UserRole/create`, user),
  createRole: (user: RoleFormValues): Promise<any> =>
    requests.post(`/Role/createrole`, user),
  deleteUserRole: (userRole: DeleteRoleFormValues): Promise<any> =>
    requests.post(`/UserRole/delete`,userRole),
};


const agent = {
  // Properties,
  User,
  Verification,
  Coupon,
  Stall,
  Customer,
  Role,
};

export default agent;
