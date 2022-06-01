import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingModal from "../../general/LoadingModal";

const ScanCouponPage = () => {
  const rootStore = useContext(RootStoreContext);
  const { open, setOpen, couponActivatedStatus, generateCoupon } =
    rootStore.couponStore;
  // const [open, setOpen] = React.useState(false);
  const [couponNumber, setCouponNumber] = React.useState(0);
  return (
    <div>
      {couponActivatedStatus === "loading" && <LoadingModal />}

      <div className="d-flex justify-content-center align-content-center pt-5">
        <div className="col-lg-5 px-3 py-5 ">
          <div className="text-center spanTittle">Scan Coupon</div>
          <p className="text-center py-3">Click continue to scan coupon</p>
          <div className=" mx-sm-5">
            <div className="form-group d-flex justify-content-center">
              <a>
                <svg
                  width="181"
                  height="151"
                  viewBox="0 0 181 151"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="180"
                    height="150"
                    rx="19.5"
                    fill="#F3F3F3"
                  />
                  <g clipPath="url(#clip0_3_31)">
                    <path
                      d="M90.4299 80.5362C95.7241 80.5362 100.308 78.6374 104.054 74.8911C107.8 71.1454 109.699 66.5623 109.699 61.2675C109.699 55.9746 107.8 51.3908 104.054 47.6439C100.307 43.8988 95.7235 42 90.4299 42C85.1351 42 80.552 43.8988 76.8063 47.6445C73.0605 51.3902 71.1611 55.9739 71.1611 61.2675C71.1611 66.5623 73.0605 71.146 76.8069 74.8917C80.5532 78.6368 85.137 80.5362 90.4299 80.5362V80.5362Z"
                      fill="#bb8c46"
                    />
                    <path
                      d="M124.145 103.516C124.037 101.957 123.819 100.257 123.497 98.461C123.172 96.6519 122.754 94.9417 122.254 93.3786C121.737 91.763 121.034 90.1675 120.164 88.6386C119.262 87.0517 118.203 85.6699 117.014 84.5328C115.771 83.3432 114.248 82.3868 112.488 81.6892C110.734 80.9952 108.79 80.6436 106.71 80.6436C105.894 80.6436 105.104 80.9787 103.579 81.9718C102.64 82.5839 101.542 83.2919 100.316 84.075C99.2684 84.7427 97.8488 85.3684 96.0952 85.9348C94.3844 86.4883 92.6473 86.7691 90.9329 86.7691C89.2184 86.7691 87.4819 86.4883 85.7693 85.9348C84.0176 85.369 82.5979 84.7434 81.5511 84.0756C80.3372 83.2999 79.2385 82.5919 78.2858 81.9712C76.7623 80.9781 75.9719 80.643 75.1553 80.643C73.0752 80.643 71.1318 80.9952 69.3783 81.6898C67.6193 82.3862 66.0964 83.3426 64.8519 84.5334C63.6636 85.6711 62.6034 87.0523 61.7025 88.6386C60.834 90.1675 60.1309 91.7624 59.6133 93.3792C59.1134 94.9423 58.6953 96.6519 58.3706 98.461C58.049 100.254 57.8304 101.955 57.7224 103.518C57.6162 105.048 57.5625 106.637 57.5625 108.242C57.5625 112.418 58.89 115.799 61.5078 118.292C64.0933 120.752 67.5143 122 71.6744 122H110.195C114.355 122 117.775 120.753 120.361 118.292C122.979 115.8 124.307 112.419 124.307 108.241C124.306 106.629 124.252 105.039 124.145 103.516V103.516Z"
                      fill="#bb8c46"
                    />
                  </g>
                  <path
                    d="M160 9C153.383 9 148 14.3829 148 21C148 27.6171 153.383 33 160 33C166.617 33 172 27.6171 172 21C172 14.3829 166.617 9 160 9Z"
                    fill="#bb8c46"
                  />

                  <path
                    d="M166.082 18.457L159.582 24.9569C159.387 25.1519 159.131 25.2501 158.875 25.2501C158.619 25.2501 158.363 25.1519 158.168 24.9569L154.918 21.707C154.527 21.316 154.527 20.684 154.918 20.293C155.309 19.9019 155.941 19.9019 156.332 20.293L158.875 22.836L164.668 17.0431C165.059 16.652 165.691 16.652 166.082 17.0431C166.473 17.434 166.473 18.0659 166.082 18.457V18.457Z"
                    fill="#FAFAFA"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="180"
                    height="150"
                    rx="19.5"
                    stroke="#bb8c46"
                  />
                  <defs>
                    <clipPath id="clip0_3_31">
                      <rect
                        width="80"
                        height="80"
                        fill="white"
                        transform="translate(51 42)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>
          <div className="form-group mt-4 mx-sm-5">
            <Button
              id="longButton"
              className="w-100 longButton px-3 "
              //   disabled={!selected1 && !selected2}
              onClick={() => setOpen(true)}
            >
              <div>Scan</div>
              <i className="fas fa-camera"></i>
            </Button>
          </div>
          {/* <p className="text-center grey-Medium_Bold-texts">
              I have a username and password,
              <span className="purpleTexts sign_Up_Link">
                <a onClick={() => history.push("/login")}>Log in</a>
              </span>
            </p> */}
        </div>
      </div>
    </div>
  );
};

export default observer(ScanCouponPage);
