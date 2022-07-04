import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import CustomerStore from "./customerStore";
import RoleStore from "./roleStore";
import CouponStore from "./couponStore";
import DashStore from "./dashStore";
// import ModalStore from "./modalStore";

configure({ enforceActions: "always" });

export class RootStore {
  userStore: UserStore;
  commonStore: CommonStore;
  customerStore: CustomerStore;
  roleStore: RoleStore;
  couponStore: CouponStore;
  dashStore: DashStore;

  // modalStore: ModalStore;

  constructor() {
    // this.propertyStore = new PropertyStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.customerStore = new CustomerStore(this);
    this.roleStore = new RoleStore(this);
    // this.modalStore = new ModalStore(this);
    this.couponStore = new CouponStore(this);
    this.dashStore = new DashStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
