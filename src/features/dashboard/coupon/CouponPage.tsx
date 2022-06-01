import { observer } from "mobx-react-lite";
import React from "react";
import { history } from "../../..";

const CouponPage = () => {
  return (
    <div>
      <div className="d-lg-flex justify-content-between">
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
        <div className="d-flex justify-content-end my-3">
          <button
            onClick={() => history.push("/dashboard/generateCoupon")}
            className="btn btn-primary btn-lg mr-3"
          >
            Generate Coupon
          </button>
          <button
            onClick={() => history.push("/dashboard/scanCoupon")}
            className="btn btn-secondary btn-lg px-5"
          >
            Scan
            <i className="fa-solid fa-qrcode mx-2"></i>
          </button>
        </div>
      </div>

      <div className="col-xl table-card table-responsive px-auto pt-2 my-3 ">
        <table className="table table-borderless text-nowrap table-striped text-center">
          <thead>
            <tr className="table-info">
              <th scope="col">QR CODE</th>
              <th scope="col">Request Date</th>
              <th scope="col">Account no</th>
              <th scope="col">Account Name</th>
              <th scope="col">Status</th>
              <th scope="col">
                <img
                  src="/images/counter-clock.svg"
                  alt=""
                  className="pb-1 pr-2"
                />
                Countdown
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3456782</td>
              <td>22nd June 2021</td>
              <td>6483453739</td>
              <td>Tunde Mustafa</td>
              <td>Pending</td>
              <td>
                <span className="font-weight-bold">2hrs</span> to complete
              </td>
            </tr>

            <tr>
              <td>3456782</td>
              <td>22nd June 2021</td>
              <td>6483453739</td>
              <td>Tunde Mustafa</td>
              <td>Pending</td>
              <td>
                <span className="font-weight-bold text-danger">30m</span> to
                complete
              </td>
            </tr>

            <tr>
              <td>3456782</td>
              <td>22nd June 2021</td>
              <td>6483453739</td>
              <td>Tunde Mustafa</td>
              <td>Pending</td>
              <td>
                <span className="font-weight-bold">2hrs</span> to complete
              </td>
            </tr>

            <tr>
              <td>3456782</td>
              <td>22nd June 2021</td>
              <td>6483453739</td>
              <td>Tunde Mustafa</td>
              <td>Pending</td>
              <td>
                <span className="font-weight-bold">2hrs</span> to complete
              </td>
            </tr>

            <tr>
              <td>3456782</td>
              <td>22nd June 2021</td>
              <td>6483453739</td>
              <td>Tunde Mustafa</td>
              <td>Pending</td>
              <td>
                <span className="font-weight-bold">2hrs</span> to complete
              </td>
            </tr>

            <tr>
              <td>3456782</td>
              <td>22nd June 2021</td>
              <td>6483453739</td>
              <td>Tunde Mustafa</td>
              <td>Pending</td>
              <td>
                <span className="font-weight-bold">2hrs</span> to complete
              </td>
            </tr>

            <tr>
              <td>3456782</td>
              <td>22nd June 2021</td>
              <td>6483453739</td>
              <td>Tunde Mustafa</td>
              <td>Pending</td>
              <td>
                <span className="font-weight-bold">2hrs</span> to complete
              </td>
            </tr>

            <tr>
              <td>3456782</td>
              <td>22nd June 2021</td>
              <td>6483453739</td>
              <td>Tunde Mustafa</td>
              <td>Pending</td>
              <td>
                <span className="font-weight-bold">2hrs</span> to complete
              </td>
            </tr>

            <tr>
              <td>3456782</td>
              <td>22nd June 2021</td>
              <td>6483453739</td>
              <td>Tunde Mustafa</td>
              <td>Pending</td>
              <td>
                <span className="font-weight-bold">2hrs</span> to complete
              </td>
            </tr>
            <tr className="view_all">
              <td className="p-0">
                <a href="#" className="font-weight-bold pr-5 mr-5">
                  View all
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">
                  <i className="fa-solid fa-chevron-left"></i>
                </span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                ...
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                8
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                9
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                10
              </a>
            </li>

            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </a>
            {/* </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default observer(CouponPage);
