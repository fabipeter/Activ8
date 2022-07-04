import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Icon, Loader } from "semantic-ui-react";
import { history } from "../../..";
import { RootStoreContext } from "../../../app/stores/rootStore";
import TablePlaceholder from "../general/TablePlaceholder";
import { CSVLink } from "react-csv";
import PaginationComponent from "../general/PaginationComponent";

const CouponPage = () => {
  const [exportSpinner, setExportSpinner] = useState("");
  const rootStore = useContext(RootStoreContext);
  const {
    generatedCouponList,
    identityCodeList,
    couponStatus,
    setStatus,
    getGeneratedList,
  } = rootStore.couponStore;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentIdentityCodeList = identityCodeList.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  useEffect(() => {
    let isCancelled = false;
    if (generatedCouponList.length === 0 && couponStatus !== "success") {
      getGeneratedList();
    }
    return () => {
      isCancelled = true;
    };
  }, []);
  return (
    // <div className="pt-md-5">
    //   <div className=" row mt-4 testimonial_wrapper mx-0 p-0">
    //     <div className="col-lg-3 d-flex align-items-center justify-content-center">
    //       <div className=" dashtestimonials card dashproducts mb-3">
    //         <div className="card-body d-flex  align-items-center justify-content-center flex-column  ">
    //           <button
    //             onClick={() => history.push("/dashboard/generateCoupon")}
    //             className="btn btn-primary btn-lg "
    //           >
    //             Generate Coupon
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-lg-3 d-flex align-items-center justify-content-center">
    //       <div className="dashtestimonials card dashproducts mb-3">
    //         <div className="card-body d-flex  align-items-center justify-content-center flex-column ">
    //           <button
    //             onClick={() => history.push("/dashboard/validateCoupon")}
    //             className="btn btn-success btn-lg mx-2"
    //           >
    //             Validate Coupon
    //             <i className="fa-solid fa-check-double mx-2"></i>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-lg-3 d-flex align-items-center justify-content-center">
    //       <div className=" dashtestimonials card dashproducts mb-3">
    //         <div className="card-body d-flex  align-items-center justify-content-center flex-column ">
    //           <button
    //             onClick={() => history.push("/dashboard/scanCoupon")}
    //             className="btn btn-secondary btn-lg px-5"
    //           >
    //             Scan QR
    //             <i className="fa-solid fa-qrcode mx-3"></i>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div>
      <div className="d-lg-flex justify-content-between">
        {generatedCouponList.length > 0 && (
          <div className="col-md-4">
            <form className="form-row mt-2 mt-lg-3 searchBar">
              <input
                className="form-control py-4 "
                type="search"
                placeholder="Search Coupon"
                aria-label="Search"
              />
              <span className="searchBar_Icon pl-3 pb-0">
                <img src="/images/binocular.svg" alt="" />
              </span>
            </form>
          </div>
        )}
        {generatedCouponList.length === 0 && (
          <div className="col-md-4">
            <form className="form-row mt-2 mt-lg-3 searchBar">
              {/* <input
                className="form-control py-4 "
                type="search"
                placeholder="Search Coupon"
                aria-label="Search"
              />
              <span className="searchBar_Icon pl-3 pb-0">
                <img src="/images/binocular.svg" alt="" />
              </span> */}
            </form>
          </div>
        )}
        <div className="d-md-flex justify-content-end my-3">
          <div className="card mb-3 border-0 mr-md-3 mr-1">
            <button
              onClick={() => history.push("/dashboard/generateCoupon")}
              className="btn btn-primary btn-lg  card-body p-2"
            >
              Generate Coupon
            </button>
          </div>
          <div className="card mb-3 border-0 mr-md-3 mr-1">
            <button
              onClick={() => history.push("/dashboard/validateCoupon")}
              className="btn btn-success btn-lg  px-5  card-body p-2"
            >
              Validate
              <i className="fa-solid fa-check-double mx-2"></i>
            </button>
          </div>
          <div className="card mb-3 border-0 mr-1">
            <button
              onClick={() => history.push("/dashboard/scanCoupon")}
              className="btn btn-secondary btn-lg  px-5 card-body p-2"
            >
              Scan
              <i className="fa-solid fa-qrcode mx-2"></i>
            </button>
          </div>
        </div>
      </div>

      {(couponStatus === "loading" || couponStatus === "") && (
        <div className="col-xl table-card table-responsive px-auto pt-2 mt-4">
          <TablePlaceholder />
          <TablePlaceholder />
        </div>
      )}
      {generatedCouponList.length > 0 ? (
        <div className="col-xl table-card table-responsive px-auto pt-2 my-3 ">
          {/* <div className="row mb-4 d-flex justify-content-between mx-auto filter-section reporting-table-header ">
          <div className="row col-md-5 mx-auto filter-utilities">
            <button>
              {" "}
              <span>
                <img src="/images/filters.svg" alt="" />
              </span>{" "}
              Filters
            </button>
            <button>
              <span>
                <img src="/images/download_icons2.svg" alt="" />
              </span>{" "}
              Attachments
            </button>

            <button data-toggle="collapse" data-target="#collapseExample">
              <span>
                <img src="/images/export-icons.svg" alt="" />
              </span>{" "}
              Export
            </button>
          </div>
        </div> */}
          <table className="table table-borderless text-nowrap table-striped text-center">
            <thead>
              <tr className="table-info">
                <th scope="col">Batch ID</th>
                <th scope="col">Generated Date</th>
                {/* <th scope="col">Account no</th>
                <th scope="col">Account Name</th> */}
                <th scope="col">Coupon Count</th>
                <th scope="col">
                  <i
                    className="fas fa-cloud-download-alt"
                    style={{ fontSize: "25px" }}
                  ></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentIdentityCodeList.map((couponId, index) => {
                return (
                  <tr key={index} className="notCursorPointer">
                    <td>{`${couponId.slice(0, 7)}...`}</td>
                    <td>
                      {new Date(
                        generatedCouponList.filter((coupon) => {
                          return coupon.couponIdentitycode === couponId;
                        })[0].dateCreated
                      ).toLocaleString("en-UK", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    {/* <td>6483453739</td>
                    <td>Tunde Mustafa</td> */}
                    <td>
                      {
                        generatedCouponList.filter((coupon) => {
                          return coupon.couponIdentitycode === couponId;
                        }).length
                      }
                    </td>
                    <td>
                      <CSVLink
                        filename="myfile.csv"
                        enclosingCharacter={`"`}
                        // target="_blank"
                        onClick={() =>
                          setTimeout(() => {
                            setExportSpinner("");
                          }, 8000)
                        }
                        // on
                        data={JSON.parse(
                          JSON.stringify(
                            generatedCouponList.filter((coupon) => {
                              return coupon.couponIdentitycode === couponId;
                            })
                          )
                        )}
                      >
                        <button
                          onClick={() => setExportSpinner(`${index}`)}
                          className="btn btn-success btn-sm mx-0"
                        >
                          {`${index}` !== exportSpinner && "Export"}
                          {`${index}` !== exportSpinner && (
                            <i className="fas fa-cloud-download-alt ml-2"></i>
                          )}
                          {`${index}` === exportSpinner && (
                            <Loader
                              size="tiny"
                              className="blueLoader"
                              active
                              inline="centered"
                            />
                          )}
                        </button>
                        {/* <Button
                          onClick={() => setExportSpinner(true)}
                          loading={exportSpinner}
                          className="btn btn-success btn-sm mx-0 unset"
                        >
                          Export
                          <i className="fas fa-cloud-download-alt ml-2"></i>
                        </Button> */}
                      </CSVLink>
                      {/* <button
                        onClick={() => console.log()}
                        className="btn btn-success btn-sm mx-0"
                      >
                        Export
                        <i className="fas fa-cloud-download-alt ml-2"></i>
                      </button> */}
                    </td>
                  </tr>
                );
              })}

              <tr className="view_all">
                <td className="p-0"></td>
              </tr>
            </tbody>
          </table>
          <div
            className="float-right pr-3"
            aria-label="Page navigation example"
          >
            <PaginationComponent
              postsPerPage={postsPerPage}
              totalPosts={identityCodeList.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      ) : (
        couponStatus !== "" &&
        couponStatus !== "loading" &&
        generatedCouponList.length === 0 && (
          <div className="ml-4">
            <h3>No Record Found</h3>
          </div>
        )
      )}
    </div>
  );
};

export default observer(CouponPage);
