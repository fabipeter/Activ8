import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";

const DashboardAnalytics = () => {
  return (
    <Fragment>
      <div className=" mt-4 cards-tray row mx-auto px-0 col-md-12">
        <a
          href="dashboard.html"
          className="col-md text-nowrap card-box1 active"
        >
          <div className="d-flex justify-content-between">
            <span className="number-Of-requests">680</span>
            <img src="/images/inbound-icon.svg" alt="" />
          </div>
          <h5>Total requests</h5>
          <span className="text-success">30 New Request</span>
          <span> Today</span>
        </a>

        <a
          href="dashboard-pending-request.html"
          className="col-md text-nowrap card-box2"
        >
          <div className="d-flex justify-content-between">
            <span className="number-Of-requests">680</span>
            <img src="/images/inbound-icon.svg" alt="" />
          </div>
          <h5 className="">Pending requests</h5>
          <span className="text-success">5 New Pending Request</span>
          <span> Today</span>
        </a>

        <a
          href="dashboard-completed-request.html"
          className="col-md text-nowrap card-box3"
        >
          <div className="d-flex justify-content-between">
            <span className="number-Of-requests">680</span>
            <img src="/images/outbound-icon.svg" alt="" />
          </div>
          <h5 className="">Completed requests</h5>
          <span className="text-success">3 Completed Request</span>
          <span> Today</span>
        </a>

        <a
          href="dashboard-declined-request.html"
          className="col-md text-nowrap card-box4"
        >
          <div className="d-flex justify-content-between">
            <span className="number-Of-requests2">10</span>
            <img src="/images/declined-icon.svg" alt="" />
          </div>
          <h5 className="">Declined requests</h5>
          <span className="text-danger">30 Declined Request</span>
          <span> Today</span>
        </a>
      </div>
      <h5 className=" table-caption font-weight-bolder mt-4">
        {" "}
        Total requests
      </h5>
      <div className=" cards-tray2 row mx-auto px-0 ">
        <div className="col-xl table-card table-responsive px-auto pt-2 ">
          <table className="table table-borderless text-nowrap table-striped text-center">
            <thead>
              <tr className="table-info">
                <th scope="col">Request ID</th>
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
                    <i className="fa-solid small fa-chevron-left"></i>
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
                  <i className="fa-solid small text-dark fa-chevron-right"></i>
                </span>
              </a>
              {/* </li> */}
            </ul>
          </div>
        </div>

        <div className=" col-xl-3 px-0">
          <div className="col-lg  recent_Requests_card">
            <h5 className="">Recent requests</h5>
            <div className="mt-4">
              <a className="recent_Requests" href="#">
                <img src="/images/requests-icon.svg" alt="" />
                <div className="">
                  Babatunde Abdul <br /> <span className="small">MSME</span>
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </a>
            </div>
            <div className="mt-4">
              <a className="recent_Requests" href="#">
                <img src="/images/requests-icon.svg" alt="" />
                <div className="">
                  Wande Cole
                  <br /> <span className="small">MSME</span>
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </a>
            </div>
            <div className="mt-4">
              <a className="recent_Requests" href="#">
                <img src="/images/requests-icon.svg" alt="" />
                <div className="">
                  Olawale Emmanuel
                  <br /> <span className="small">MSME</span>
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </a>
            </div>
            <div className="mt-4">
              <a className="recent_Requests" href="#">
                <img src="/images/requests-icon.svg" alt="" />
                <div className="">
                  Olawale Emmanuel
                  <br /> <span className="small">MSME</span>
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </a>
            </div>
            <div className="mt-4">
              <a className="recent_Requests mt-4" href="#">
                <img src="/images/requests-icon.svg" alt="" />
                <div className="">
                  Olawale Emmanuel
                  <br /> <span className="small">MSME</span>
                </div>
                <i className="fa-solid fa-chevron-right"></i>
              </a>
            </div>
            <div className="small mt-3">View all</div>
          </div>
          <div className="col-lg-12 border mt-4 d-flex justify-content-center align-items-center py-4 product_Manager flex-column">
            <h5 className="text-danger">Supervisor</h5>
            <span className="mb-2">Omorinwa Adeyemo Ige</span>
            <img src="/images/supervisor-pix.jpg" alt="product Manger" />
            <span className="small mt-2">Product Manager</span>
            <span className="text-danger small">Omorinwa.Ade@Sterling.ng</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default observer(DashboardAnalytics);
