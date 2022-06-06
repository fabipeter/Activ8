import { observer } from "mobx-react-lite";
import React, { useContext, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { Button } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingModal from "../../general/LoadingModal";
import SuccessfulMessageModal from "../general/SuccessfulMessageModal";

const ScanCouponPage = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    open,
    setOpen,
    couponActivatedStatus,
    useCoupon,
    setActivatedStatus,
  } = rootStore.couponStore;
  const [data, setData] = useState("No result");
  // const [open, setOpen] = React.useState(false);
  const [couponNumber, setCouponNumber] = React.useState(0);

  const handleScanPeriod = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 10000);
  };
  const videoStyle = {
    top: "0px",
    left: "0px",
    zIndex: "1",
    boxSizing: "border-box",
    border: "50px solid rgba(0, 0, 0, 0.3)",
    boxShadow: "rgba(255, 0, 0, 0.5) 0px 0px 0px 5px inset !important",
    position: "absolute",
    width: " 100%",
    height: " 100%",
    objectFit: "cover",
  };
  // console.log(data);
  return (
    <div>
      {couponActivatedStatus === "loading" && <LoadingModal />}
      {couponActivatedStatus === "success" && (
        <SuccessfulMessageModal
          closeModal={setActivatedStatus}
          message={"Coupon Applied Successfully"}
        />
      )}

      <div className="d-flex justify-content-center align-content-center pt-0">
        <div className="col-lg-5 px-3 py-5 ">
          <div className="text-center spanTittle">Scan Coupon</div>
          <p className="text-center pb-3">Click Scan to Continue</p>
          <div className=" mx-sm-5">
            <div className="form-group d-flex justify-content-center">
              {open ? (
                <div>
                  <QrReader
                    key="environment"
                    constraints={{ facingMode: "environment" }}
                    onResult={(result, error) => {
                      if (!!result) {
                        setData(result!.getText());
                        useCoupon(data).catch();
                        setOpen(false);
                      }

                      if (!!error) {
                        // setOpen(false);
                        // console.info(error);
                      }
                    }}
                    scanDelay={300}
                    className="qrScanner"
                    // videoContainerStyle={videoStyle}
                  />
                </div>
              ) : (
                // <svg
                //   id="eNGg1Y9PFLM1"
                //   xmlns="http://www.w3.org/2000/svg"
                //   xmlnsXlink="http://www.w3.org/1999/xlink"
                //   viewBox="30 110 380 275"
                //   shapeRendering="geometricPrecision"
                //   textRendering="geometricPrecision"
                // >
                //   <g transform="translate(-62.869664-33.449401)">
                //     <g>
                //       <path
                //         d="M291.181796,247.387758c-30.375273,0-55.008282,22.488585-55.008282,50.229954c0,27.747277,24.630134,50.229955,55.008282,50.229955c30.386774,0,55.009002-22.489898,55.009002-50.229955c0-27.738087-24.622228-50.229954-55.009002-50.229954Zm0,73.944605c-14.341642,0-25.962017-10.621087-25.962017-23.711369c0-13.098158,11.623968-23.710056,25.962017-23.710056c14.340205,0,25.96633,10.611898,25.96633,23.710056c0,13.090282-11.626125,23.711369-25.96633,23.711369Zm19.587236-20.138189c-2.100969,7.908384-7.148899,13.576639-11.287584,12.663654-1.395854-.309142-2.500605-1.336333-3.272566-2.858413c3.696641-.754148,7.66929-5.875662,9.478437-12.653152c1.38651-5.239001,1.124877-10.138668-.408981-13.112598.606643-.122738,1.221192-.136521,1.80196-.007876c4.134372.905765,5.785389,8.062626,3.688734,15.968385Zm-131.261287,50.88565c-4.443444,3.889542-4.588636,10.332948-.327041,14.381327c4.257282,4.054285,11.309865,4.186868,15.748278.300609c4.436975-3.892167,4.58576-10.33623.330635-14.38789-4.258001-4.05166-11.309866-4.186213-15.751872-.294046Zm10.687409,10.998489c-1.968714,1.722924-5.106151,1.665165-6.998675-.137834-1.893963-1.802342-1.825679-4.662067.149504-6.392867c1.967996-1.724237,5.106151-1.666478,6.998676.136521c1.894681,1.802342,1.829273,4.665349-.149505,6.39418ZM441.595462,216.846391h-6.049179v-7.036092c0-2.221095-1.961527-4.018843-4.396724-4.018843h-96.289471l-3.781456-30.471137c0-2.221095-1.965839-4.018843-4.403193-4.018843h-80.234278c-2.433041,0-4.403193,1.797748-4.403193,4.018843l-3.788643,30.471137h-47.489935v-7.032154h-27.504501v7.03281h-21.289286c-2.43304,0-4.401755,1.797748-4.401755,4.018843v7.032154h-6.322312c-2.5387,0-5.502194.603844-5.502194,2.298545v7.935294c0,1.69667,2.963494,2.298545,5.502194,2.298545h6.322312v157.251413c0,2.223064,1.968715,4.024094,4.401755,4.024094h289.18755c2.432322,0,4.39888-1.80103,4.39888-4.024094v-157.250757h6.055648c2.542294,0,5.499319-.601875,5.499319-2.298545v-7.935294c-.002875-1.695357-2.966369-2.295919-5.511538-2.295919ZM137.564567,227.368368h-6.323031c-1.735832,0-2.904554-.309141-3.29916-.528363v-7.459439c.398918-.217253,1.566922-.529676,3.29916-.529676h6.322312v8.517478Zm113.81599-48.699342h70.959254v16.07012h-70.959254v-16.07012ZM216.055825,335.572574L202.44661,364.297815c-.135129.324894-.288946.646506-.453544.962868l-.588674,1.249694c-.176099.373464-.431263.704266-.74896.983872-.065408.057759-.149504.085982-.222819.143741-.530453.662259-1.107626,1.287106-1.771771,1.867977-6.326624,5.545517-16.382953,5.35255-22.457289-.424003-6.072898-5.783117-5.863017-14.966793.463608-20.507715.631081-.549367,1.31032-1.030473,2.006809-1.468916.241507-.219221.506734-.412845.817243-.557243l32.042103-14.847336c1.243475-.574308,2.746425-.383966,3.757737.488982c1.011311.87623,1.321101,2.212562.764772,3.382838Zm75.005936,28.287454c-39.700611,0-71.882875-29.386187-71.882875-65.639785c0-36.250971,32.17867-65.640441,71.882875-65.640441c39.687674,0,71.875688,29.385531,71.875688,65.640441c0,36.253598-32.180826,65.639785-71.875688,65.639785Zm105.98354-120.893457c-6.985019,0-12.656124-5.172053-12.656124-11.555731c0-6.380397,5.659605-11.555732,12.656124-11.555732c6.992926,0,12.658281,5.175335,12.658281,11.555732-.012938,6.380397-5.671106,11.555731-12.658281,11.555731Zm47.866572-16.126566c-.408981.21594-1.572672.528363-3.304192.528363h-6.055648v-8.514196h6.055648c1.737989,0,2.902398.312423,3.304192.529676v7.456157Z"
                //         strokeLinecap="square"
                //       />
                //     </g>
                //   </g>
                // </svg>
                <svg
                  id="eQfSVJydtUe1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="5 4 15 14"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                >
                  <g>
                    <path
                      d="M4.627522,4.515983h12.514169v12.133303h-12.514169Z"
                      fill="none"
                    />
                    <path
                      d="M12.727726,6.386987h3.128542v2.527772h-1.042847v-1.516663h-2.085695v-1.011109Zm-3.128542,0v1.011109h-2.085695v1.516663h-1.042848v-2.527772h3.128543Zm3.128542,9.099978v-1.011109h2.085695v-1.516663h1.042847v2.527772h-3.128542Zm-3.128542,0h-3.128543v-2.527772h1.042848v1.516663h2.085695v1.011109ZM6.470641,10.431422h9.385627v1.011108h-9.385627v-1.011108Z"
                      transform="translate(1.285423 0.163234)"
                    />
                  </g>
                </svg>
              )}
            </div>
          </div>
          <div className="form-group mt-4 mx-sm-5">
            {!open && (
              <Button
                id="longButton"
                className="w-100 longButton px-3 "
                //   disabled={!selected1 && !selected2}
                onClick={() => handleScanPeriod()}
              >
                <div>Scan</div>
                <i className="fas fa-camera"></i>
              </Button>
            )}
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
