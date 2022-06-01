export class RoleDropDownOption {
    key: string ="";
    text: string ="";
    value: string="";
  }


export interface IUserRole{
    Id:number;
    FullName:string;
    UserID:string;
    UserName:string;
    IsDeleted:boolean;
    RoleID:string;
    RoleName:string;
    // agreedAmount:string;
    PhoneNumber:string;
    UserEmail:string;
    Activate:boolean;
    DateCreated:Date;
    labelAction:string;
    ActionStatus:string;
    labelbuttonCsc:string;
    labelActionCsc:string;
}

export interface IRole{
    Id:number;
    RoleName:string;
    RoleType:string;
    RoleTypeID:number;
    labelAction:string;
    ActionStatus:string;
    labelbuttonCsc:string;
    labelActionCsc:string;
}


export class RoleFormValues{
    roleTypeID?: number;
    roleName: string= "";
  }

  export class DeleteRoleFormValues{
    id: number=0;
    userID: string= "";
  }

export class UserRoleUpdateFormValues{
    id?:number;
    fullName:string ="";
    userID: string ="";
    userEmail:string ="";
    phoneNumber:string ="";
    roleID :string="";
    createdBy:string="";
    dateCreated!:Date;
    isDeleted:boolean = false;
    dateDeleted!:Date;
    deletedBy:string = "";
    dateLastModified!:Date;
    modifiedBy:string="";
    bulkUpload:boolean = false;
    activate?:boolean;
    activatedBy:string = "";
    deactivatedBy:string ="";
    deactivatedDate!:Date;

}


export class UserRole{
    id:number =0;
    fullName:string ="";
    userID: string ="";
    userEmail:string ="";
    phoneNumber:string ="";
    roleID :string="";
    createdBy:string="";
    dateCreated!:Date;
    isDeleted:boolean = false;
    dateDeleted!:Date;
    deletedBy:string = "";
    dateLastModified!:Date;
    modifiedBy:string="";
    bulkUpload:boolean = false;
    activate?:boolean;
    activatedBy:string = "";
    deactivatedBy:string ="";
    deactivatedDate!:Date;

}


export class UserRoleList{
    list: UserRole[]=[];
}
 

export interface IUserRoleDetails{
    userEmail:string;
    roleID:string;
}