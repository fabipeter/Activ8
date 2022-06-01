import { observer } from "mobx-react-lite";
import React, { Fragment, useState } from "react";
import { Button } from "semantic-ui-react";
import { history } from "../../../..";

const LoginOptionPage = (props: any) => {
  const { setOptionState } = props;
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  // const [selected3, setSelected3] = useState(false);

  const select1 = () => {
    setSelected1(!selected1);
    setSelected2(false);
    // setSelected3(false);
  };

  const select2 = () => {
    setSelected1(false);
    setSelected2(!selected2);
    // setSelected3(false);
  };

  return (
    <Fragment>
      <div className="commonPageWrapper">
        <div className="pt-5 pl-5">
          <a className="cursorPointer" onClick={() => history.push("/")}>
            <div className="backNav">
              <img src="./images/blackArrow.svg" alt="" />
              <span>Back</span>
            </div>
          </a>
        </div>
        <div className="d-flex justify-content-center align-content-center pt-5">
          <div className="col-lg-5 px-5 py-2 ">
            <img
              src="./images/ACTIV8 SVG (1).svg"
              className="mx-auto d-block mb-1 logoSize"
              alt="Alt Finance Logo"
            />
            <div className="text-center spanTittle">Login on ACTIV8</div>
            <p className="text-center py-3">Which best describes you?</p>
            <div className="row justify-content-around flex-wrap mx-5">
              <div className="form-group">
                <a onClick={select1}>
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
                        fill={selected1 ? "#bb8c46" : "black"}
                      />
                      <path
                        d="M124.145 103.516C124.037 101.957 123.819 100.257 123.497 98.461C123.172 96.6519 122.754 94.9417 122.254 93.3786C121.737 91.763 121.034 90.1675 120.164 88.6386C119.262 87.0517 118.203 85.6699 117.014 84.5328C115.771 83.3432 114.248 82.3868 112.488 81.6892C110.734 80.9952 108.79 80.6436 106.71 80.6436C105.894 80.6436 105.104 80.9787 103.579 81.9718C102.64 82.5839 101.542 83.2919 100.316 84.075C99.2684 84.7427 97.8488 85.3684 96.0952 85.9348C94.3844 86.4883 92.6473 86.7691 90.9329 86.7691C89.2184 86.7691 87.4819 86.4883 85.7693 85.9348C84.0176 85.369 82.5979 84.7434 81.5511 84.0756C80.3372 83.2999 79.2385 82.5919 78.2858 81.9712C76.7623 80.9781 75.9719 80.643 75.1553 80.643C73.0752 80.643 71.1318 80.9952 69.3783 81.6898C67.6193 82.3862 66.0964 83.3426 64.8519 84.5334C63.6636 85.6711 62.6034 87.0523 61.7025 88.6386C60.834 90.1675 60.1309 91.7624 59.6133 93.3792C59.1134 94.9423 58.6953 96.6519 58.3706 98.461C58.049 100.254 57.8304 101.955 57.7224 103.518C57.6162 105.048 57.5625 106.637 57.5625 108.242C57.5625 112.418 58.89 115.799 61.5078 118.292C64.0933 120.752 67.5143 122 71.6744 122H110.195C114.355 122 117.775 120.753 120.361 118.292C122.979 115.8 124.307 112.419 124.307 108.241C124.306 106.629 124.252 105.039 124.145 103.516V103.516Z"
                        fill={selected1 ? "#bb8c46" : "black"}
                      />
                    </g>
                    {selected1 && (
                      <path
                        d="M160 9C153.383 9 148 14.3829 148 21C148 27.6171 153.383 33 160 33C166.617 33 172 27.6171 172 21C172 14.3829 166.617 9 160 9Z"
                        fill="#bb8c46"
                      />
                    )}
                    {selected1 && (
                      <path
                        d="M166.082 18.457L159.582 24.9569C159.387 25.1519 159.131 25.2501 158.875 25.2501C158.619 25.2501 158.363 25.1519 158.168 24.9569L154.918 21.707C154.527 21.316 154.527 20.684 154.918 20.293C155.309 19.9019 155.941 19.9019 156.332 20.293L158.875 22.836L164.668 17.0431C165.059 16.652 165.691 16.652 166.082 17.0431C166.473 17.434 166.473 18.0659 166.082 18.457V18.457Z"
                        fill="#FAFAFA"
                      />
                    )}
                    <rect
                      x="0.5"
                      y="0.5"
                      width="180"
                      height="150"
                      rx="19.5"
                      stroke={selected1 ? "#bb8c46" : "#383838"}
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

                  <div className="text-center">Customer</div>
                </a>
              </div>
              <div className="form-group">
                {" "}
                <a onClick={select2}>
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
                      fill="white"
                    />
                    <path
                      d="M115.604 40.5319L64.0427 21.1966C61.8516 20.4232 59.6602 22.0345 59.6602 24.2261V124.555H56.2227C54.4178 124.555 53 125.973 53 127.778C53 129.582 54.4178 131 56.2227 131H117.666C117.666 110.073 117.666 96.1764 117.666 43.5614C117.666 42.2077 116.828 40.9831 115.604 40.5319ZM85.4403 124.555H72.5501V108.442C72.5501 106.637 73.9679 105.219 75.7728 105.219H85.4405V124.555H85.4403ZM82.2179 98.7745H75.7728C73.9679 98.7745 72.5501 97.3564 72.5501 95.5519C72.5501 93.747 73.9679 92.3292 75.7728 92.3292H82.2179C84.0228 92.3292 85.4405 93.747 85.4405 95.5519C85.4403 97.3564 84.0228 98.7745 82.2179 98.7745ZM82.2179 85.8843H75.7728C73.9679 85.8843 72.5501 84.4662 72.5501 82.6617C72.5501 80.8568 73.9679 79.439 75.7728 79.439H82.2179C84.0228 79.439 85.4405 80.8568 85.4405 82.6617C85.4403 84.4662 84.0228 85.8843 82.2179 85.8843ZM82.2179 72.9942H75.7728C73.9679 72.9942 72.5501 71.576 72.5501 69.7715C72.5501 67.9666 73.9679 66.5488 75.7728 66.5488H82.2179C84.0228 66.5488 85.4405 67.9666 85.4405 69.7715C85.4403 71.576 84.0228 72.9942 82.2179 72.9942ZM82.2179 60.104H75.7728C73.9679 60.104 72.5501 58.6858 72.5501 56.8813C72.5501 55.0764 73.9679 53.6587 75.7728 53.6587H82.2179C84.0228 53.6587 85.4405 55.0764 85.4405 56.8813C85.4403 58.6858 84.0228 60.104 82.2179 60.104ZM104.776 124.555H91.8856V105.22H101.553C103.358 105.22 104.776 106.637 104.776 108.442V124.555H104.776ZM101.553 98.7745H95.1081C93.3032 98.7745 91.8854 97.3564 91.8854 95.5519C91.8854 93.747 93.3032 92.3292 95.1081 92.3292H101.553C103.358 92.3292 104.776 93.747 104.776 95.5519C104.776 97.3564 103.358 98.7745 101.553 98.7745ZM101.553 85.8843H95.1081C93.3032 85.8843 91.8854 84.4662 91.8854 82.6617C91.8854 80.8568 93.3032 79.439 95.1081 79.439H101.553C103.358 79.439 104.776 80.8568 104.776 82.6617C104.776 84.4662 103.358 85.8843 101.553 85.8843ZM101.553 72.9942H95.1081C93.3032 72.9942 91.8854 71.576 91.8854 69.7715C91.8854 67.9666 93.3032 66.5488 95.1081 66.5488H101.553C103.358 66.5488 104.776 67.9666 104.776 69.7715C104.776 71.576 103.358 72.9942 101.553 72.9942ZM101.553 60.104H95.1081C93.3032 60.104 91.8854 58.6858 91.8854 56.8813C91.8854 55.0764 93.3032 53.6587 95.1081 53.6587H101.553C103.358 53.6587 104.776 55.0764 104.776 56.8813C104.776 58.6858 103.358 60.104 101.553 60.104Z"
                      fill={selected2 ? "#bb8c46" : "#383838"}
                    />
                    {selected2 && (
                      <path
                        d="M160 9C153.383 9 148 14.3829 148 21C148 27.6171 153.383 33 160 33C166.617 33 172 27.6171 172 21C172 14.3829 166.617 9 160 9Z"
                        fill="#bb8c46"
                      />
                    )}
                    {selected2 && (
                      <path
                        d="M166.082 18.457L159.582 24.9569C159.387 25.1519 159.131 25.2501 158.875 25.2501C158.619 25.2501 158.363 25.1519 158.168 24.9569L154.918 21.707C154.527 21.316 154.527 20.684 154.918 20.293C155.309 19.9019 155.941 19.9019 156.332 20.293L158.875 22.836L164.668 17.0431C165.059 16.652 165.691 16.652 166.082 17.0431C166.473 17.434 166.473 18.0659 166.082 18.457V18.457Z"
                        fill="#FAFAFA"
                      />
                    )}
                    <rect
                      x="0.5"
                      y="0.5"
                      width="180"
                      height="150"
                      rx="19.5"
                      stroke={selected2 ? "#bb8c46" : "#383838"}
                    />
                  </svg>

                  {/* <img
                    src={
                      selected2
                        ? "./images/businessName2.svg"
                        : "./images/businessName.svg"
                    }
                    alt="individual customer sign up"
                  /> */}
                  <div className="text-center">Corporate</div>
                </a>
              </div>
            </div>
            <div className="form-group mt-4 mx-sm-5">
              <Button
                id="longButton"
                className="w-100 longButton px-3 "
                type="button"
                disabled={!selected1 && !selected2}
                onClick={
                  selected1 ? () => setOptionState(1) : () => setOptionState(2)
                }
              >
                <div className={!selected1 && !selected2 ? "" : ""}>
                  Continue
                </div>
                <img
                  className="my-auto"
                  src="./images/whiteArrow.svg"
                  alt="continueArrow"
                />
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
    </Fragment>
  );
};

export default observer(LoginOptionPage);
