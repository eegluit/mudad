import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Card, Table, Modal } from "react-bootstrap";
import { getUsers, deleteUser, userKycDetalis, kycVerified } from "../../services/user";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { addProjectId } from "../../redux/reducers/userSlice";

export const Merchant = () => {
  const [isLoading, setLoading] = useState(false);
  const [popUpShow, setPopUpShow] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  const [data, setData] = useState([]);
  const dispatch = useDispatch({});
  const [kycData, setKycData] = useState({});
  const [columns, setColumns] = useState([
    {
      name: `Name`,
      cell: (row) => (
        // <Link to={""} onClick={() => handleClick(row._id)}>
          row.name
        // </Link>
      ),
    },
    { name: `Role`, selector: "role" },
    { name: `Email`, selector: "email", width: "25%" },
    { name: `Verified`, selector: "verified" },
    {
      name: `Kyc Status`,
      width: "20%",
      cell: (row) => (
        <>
          {row.isKyc == "Completed by customer" ? (
            <Link to={""} onClick={() => handleClick(row._id)}>
              {row.isKyc}
            </Link>
          ) : (
            row.isKyc
          )}
        </>
      ),
    },
    { name: `Store registered`, selector: "isStore", width: "13%" },
    {
      name: `Action`,
      cell: (row) => {
        return (
          <>
            <div className="action_icons">
              <RiDeleteBin6Line
                className={`icon_style`}
                onClick={() => handleDelete(row._id)}
              />
            </div>
          </>
        );
      },
    },
  ]);
  useEffect(() => {
    getUsersData();
  }, []);

  const handleClick = async (id) => {
    console.log(id);
    const data = {
        token : userInfo.token,
        userId: id
      }
      userKycDetalis(data)
      .then(async (response) => {
        if(response) {
          console.log(response);
          setKycData(response.response);
          setPopUpShow(!popUpShow);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('Something went wrong');
      });
  };

  const getUsersData = () => {
    const data = {
      token: userInfo.token,
      role: "merchant",
    };
    getUsers(data)
      .then(async (response) => {
        if (response.user) {
          let userList = response.user.map((userData) => {
            console.log(userData.isKyc);
            return {
              _id: userData.id,
              name: userData.name,
              email: userData.email,
              verified: userData.isEmailVerified.toString(),
              role: userData.role,
              isKyc: userData.kycStatus,
              isStore: userData.storeRegistered.toString(),
            };
          });
          setData(userList);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("Something went wrong");
      });
  };

  const handleClose = () => {
    setPopUpShow(false)
  };

  const handleDelete = (id) => {
    const data = {
      id: id,
      token: userInfo.token,
    };
    deleteUser(data)
      .then(async (response) => {
        console.log(response);
        if (response.message) {
          getUsersData();
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const handleKycSubmit = (res) => {
    const data = {
        status : res,
        token: userInfo.token,
        id : kycData.id
      };
      kycVerified(data)
        .then(async (response) => {
            console.log(response);
            if (response.message) {
                handleClose();
                getUsersData();
            }
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
        });
  }
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Merchant</Card.Title>
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={data}
              pagination
              highlightOnHover={true}
              responsive={true}
            />
          </Card.Body>
        </Card>
      </Col>
      <Modal show={popUpShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <b>Kyc Details</b>
        </Modal.Header>
        <Modal.Body>
          <p>
            <b>Kyc Id Type :</b> <span>{kycData ? kycData.idType : ''}</span>
          </p>
          <hr />
          <div>
            <div className="row">
                <div className="col-6">
                    <p><b>Kyc Document</b></p>
                    <img className="doc-box" src={kycData ? kycData.kycDoc : ''}/>
                </div>
                <div className="col-6">
                    <p><b>Selife</b></p>
                    <img className="doc-box" src={kycData ? kycData.selfie : ''}/>
                </div>
            </div>
          </div>
          <hr />
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-danger" onClick={() => handleKycSubmit('Rejected')}>Reject</button>
            <button className="btn btn-success" onClick={() => handleKycSubmit('Verified')}>Verify</button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};
