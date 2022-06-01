import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { DeleteRoleFormValues, IRole, IUserRole, IUserRoleDetails, RoleDropDownOption, RoleFormValues, UserRoleUpdateFormValues } from "../models/role";
import { RootStore } from "./rootStore";



export default class RoleStore {
    rootStore: RootStore;
  
    constructor(rootStore: RootStore) {
      // update mobx lite to read observables
      makeAutoObservable(this);
  
      this.rootStore = rootStore;
    }
  
    @observable loadingInitial = false;
    @observable roleStatus = "default";
    @observable userRoleActivatedStatus = "default";
    @observable userRoleList: IUserRole[] | null = null;
    @observable submitting = "default";
    @observable roleDetailsArray: IRole[] | null = null;
    @observable updateRoleDetailsArray: IUserRole[] = [];
    @observable updateUser: UserRoleUpdateFormValues = new UserRoleUpdateFormValues();
    @observable roleOptions: RoleDropDownOption[]  = [];
    @action setStatus = (x: string) => {
      this.roleStatus = x;
    };
    @action setSubmitting = (x: string) => {
      this.submitting = x;
    };
    @action setLoadingInitial = (x: boolean) => {
      this.loadingInitial = x;
    };
    @action setActivatedStatus = (x: string) => {
      this.userRoleActivatedStatus = x;
    };


    @action loadAllRoles = async () => {
      this.setStatus("loading");
      try {
        const responses = await agent.Role.getAllRoles();
        // console.log(responses)

          runInAction(() => {
            // this.categoryDetailsArray = response;

            // empty the array for dropdowns to add it in case of refresh
            this.roleOptions = [];
  
            responses.filter((response) => {
              const dropdDownOption = new RoleDropDownOption();
              dropdDownOption.key = response.Id;
              dropdDownOption.text = response.RoleName;
              dropdDownOption.value = response.Id.toString();
              return this.roleOptions.push(dropdDownOption);
            });
            
            this.roleStatus = "default";
          });
        return this.roleOptions;
      } catch (error) {
        runInAction(() => {
          this.roleStatus = "default";
        });
        
        // console.log(error);
        throw error;
      }
    };
  


  
    @action loadAllUserRoles = async () => {
      this.loadingInitial = true;
      try {
        if (this.userRoleList === null) {

          if(this.roleDetailsArray === null)
          {
            this.roleDetailsArray = await agent.Role.getAllRoles();
            
          }

          const response = await agent.Role.getAllUserRoles();
          // console.log(response);
  
          runInAction(() => {
            this.userRoleList = response;
            //   this.searchedPropertyList = this.propertyList;
            this.loadingInitial = false;
          });
          // this.loadingInitial = false;
        }
        return this.userRoleList;
      } catch (error) {
        runInAction(() => {
          this.loadingInitial = false;
        });
        // this.loadingInitial = false;
        // console.log(error);
        throw error;
      }
    };
  
    @action verifyUser = async (role: IUserRoleDetails) => {
      // console.log(role);
      // console.log("property => ", property);
      // property.costOfHouse = parseInt(property.costOfHouse)
      try {
        this.setStatus("loading");
        // console.log( this.rootStore.commonStore.loggedInUser.UserDetails.accountNumber);
  
        const response = await agent.Role.verifyUser(role);
        // console.log("response => ", response);
  
        if (response.isSuccess === true) {
          runInAction(() => {
            this.userRoleList = null;  
            this.roleStatus = "success";
          });
          // console.log(response);
        } else {
          runInAction(() => {
            this.roleStatus = "inelligible";
          });
          //   toast.error(response.message);
          return response.message;
        }
      } catch (error) {
        runInAction(() => {
          this.roleStatus = "inelligible";
        });
        //   toast.error("Problem submitting data");
        throw error;
        // console.log(error.response);
      }
    };


    @action loadUpdateUserRole = async (paramID:number) => {
      this.setStatus("loading");
      try {

        if (this.userRoleList === null || this.updateRoleDetailsArray.length == 0) {
          // this.loadAllUserRoles();
          const response = await agent.Role.getAllUserRoles();
          this.updateRoleDetailsArray = response;
        }

        const responses = await agent.Role.getAllRoles();
        // console.log(this.updateRoleDetailsArray)
       

          runInAction(() => {
            // this.categoryDetailsArray = response;

             // empty the array for dropdowns to add it in case of refresh
            this.roleOptions = [];

            responses.filter((response) => {
              const dropdDownOption = new RoleDropDownOption();
              dropdDownOption.key = response.Id;
              dropdDownOption.text = response.RoleName;
              dropdDownOption.value = response.Id.toString();
              return this.roleOptions.push(dropdDownOption);
            });


            this.updateUser.id = this.updateRoleDetailsArray.filter((user) =>{
              return user.Id == paramID
            })[0].Id
            this.updateUser.fullName = this.updateRoleDetailsArray.filter((user) =>{
              return user.Id == paramID
            })[0].FullName
            this.updateUser.userID = this.updateRoleDetailsArray.filter((user) =>{
              return user.Id == paramID
            })[0].UserID
            this.updateUser.userEmail = this.updateRoleDetailsArray.filter((user) =>{
              return user.Id == paramID
            })[0].UserEmail
            this.updateUser.roleID = this.updateRoleDetailsArray.filter((user) =>{
              return user.Id == paramID
            })[0].RoleID            
            this.updateUser.activate = this.updateRoleDetailsArray.filter((user) =>{
              return user.Id == paramID
            })[0].Activate
            
           

            
            this.roleStatus = "default";
          });
          // console.log(this.roleOptions)
        // return this.roleOptions;
      } catch (error) {
        runInAction(() => {
          this.roleStatus = "default";
        });
        
        // console.log(error);
        throw error;
      }
    };



  
    @action updateUserRole = async (values: any) => {
      try {
        runInAction(() => {
          this.roleStatus = "loading";
        });

        this.updateUser.activate = values.activate =="true"?true:false;
        this.updateUser.roleID = values.roleID;
  
        // console.log(this.updateUser);
        const response = await agent.Role.updateUserRole(this.updateUser);
        if (response.isSuccess === true) {
          runInAction(() => {
            this.userRoleList = null; 
            this.roleStatus = "success";
          });
          // console.log(response);
        } else {
          runInAction(() => {
            this.roleStatus = "inelligible";
          });
          //   toast.error(response.message);
          return response.message;
        }
      } catch (error) {
        runInAction(() => {
          this.roleStatus = "inelligible";
        });
        //   toast.error("Problem submitting data");
        throw error;
        // console.log(error.response);
      }
    };


    @action deleteUserRole = async (Id: number, userId:string) => {
      try {
        runInAction(() => {
          this.userRoleActivatedStatus = "loading";
        });


        const userRole = new DeleteRoleFormValues();
        userRole.id = Id;
        userRole.userID = this.rootStore.commonStore.loggedInUser.userID.toString();

        // const userRole = {
        //   id:Id,
        //   userID:userId,
        // }
  
        // console.log(this.updateUser);
        const response = await agent.Role.deleteUserRole(userRole);
        if (response.isSuccess === true) {
                   
          runInAction(() => {
            this.userRoleList = null;  
            this.userRoleActivatedStatus = "";
          });
            toast.info("Record Deleted Successfully");
        } else {
          runInAction(() => {
            this.userRoleActivatedStatus = "inelligible";
          });
            toast.error(response.message);
          return response.message;
        }
      } catch (error) {
        runInAction(() => {
          this.userRoleActivatedStatus = "inelligible";
        });
          toast.error("Problem submitting data");
        throw error;
        // console.log(error.response);
      }
    };




    @action createRole = async (role: RoleFormValues) => {
      try {
        this.setStatus("loading");
  
        const response = await agent.Role.createRole(role);
        // console.log("response => ", response);
  
        if (response.isSuccess === true) {
          runInAction(() => {
            this.userRoleList = null; 
            this.roleStatus = "success";
          });
          // console.log(response);
        } else {
          runInAction(() => {
            this.roleStatus = "inelligible";
          });
          //   toast.error(response.message);
          return response.message;
        }
      } catch (error) {
        runInAction(() => {
          this.roleStatus = "inelligible";
        });
          toast.error("Problem submitting data");
        throw error;
        // console.log(error.response);
      }
    };


  }