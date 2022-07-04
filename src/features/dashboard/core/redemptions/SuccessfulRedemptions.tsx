import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import PaginationComponent from "../../general/PaginationComponent";
import TablePlaceholder from "../../general/TablePlaceholder";

const SuccessfulRedemptions = () => {
  const rootStore = useContext(RootStoreContext);
  const { generatedCouponList, couponStatus } = rootStore.dashStore;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCouponList = generatedCouponList.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="col-xl table-card table-responsive px-auto pt-2 my-3 ">
      {(couponStatus === "loading" || couponStatus === "") && (
        <div className="col-xl table-card table-responsive px-auto pt-2 mt-4">
          <TablePlaceholder />
        </div>
      )}
      {generatedCouponList.filter((current) => {
        return current.isUsed;
      }).length > 0 ? (
        <table className="table table-borderless text-nowrap table-striped text-center">
          <thead>
            <tr className="table-info">
              <th scope="col">ID</th>
              <th scope="col">Created Date</th>
              <th scope="col">Status</th>
              {/* <th scope="col">
                <img
                  src="/images/counter-clock.svg"
                  alt=""
                  className="pb-1 pr-2"
                />
                Countdown
              </th> */}
            </tr>
          </thead>
          <tbody>
            {currentCouponList
              .filter((current) => {
                return current.isUsed;
              })
              .map((coupon, index) => {
                return (
                  <tr key={index}>
                    <td>{coupon.id}</td>
                    <td>
                      {new Date(coupon.dateCreated).toLocaleString("en-UK", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>{coupon.isUsed ? "Redeemed" : "Available"}</td>
                    {/* <td>Tunde Mustafa</td> */}
                  </tr>
                );
              })}

            {/* <tr className="view_all">
              <td className="p-0">
               
              </td>
            </tr> */}
          </tbody>
        </table>
      ) : (
        couponStatus !== "" &&
        couponStatus !== "loading" &&
        generatedCouponList.filter((current) => {
          return current.isUsed;
        }).length === 0 && (
          <div className="ml-4">
            <h3>No Record Found</h3>
          </div>
        )
      )}
      {generatedCouponList.filter((current) => {
        return current.isUsed;
      }).length > 0 && (
        <div className="float-right pr-3" aria-label="Page navigation example">
          <PaginationComponent
            postsPerPage={postsPerPage}
            totalPosts={generatedCouponList.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default observer(SuccessfulRedemptions);
