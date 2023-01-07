import React, {useEffect, useState} from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';
import {getUsers, deleteUser} from "../../services/user";
import {useSelector, useDispatch} from 'react-redux';
import DataTable from "react-data-table-component";
import {AiFillEdit} from "react-icons/ai"
import {RiDeleteBin6Line} from "react-icons/ri"
import { addProjectId } from "../../redux/reducers/userSlice";
import { Button, Modal } from 'antd';

export const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
    const [isLoading, setLoading] = useState(false);
    const userInfo = useSelector((state) => state.userInfo);
    const [data, setData] = useState([]);
    const dispatch = useDispatch({});
    const [columns, setColumns] = useState([
      { name: `Name`, selector: "name"},
      { name: `Role`, selector: "role" },
      { name: `Email`, selector: "email", width: "25%" },
      { name:  `Verified`, selector: "verified" },
      { name: `Action`, cell: (row) => {
        return (
          <>
          <div className="action_icons">
            <RiDeleteBin6Line 
              className={`icon_style`}
              onClick={() => handleDelete(row._id)}
              />
          </div>
          </>
        )
        }, 
      },
    ]);
    useEffect(() => {
        getUsersData();
    }, []);

    const handleClick = async (id) => {
      console.log(id);
      await dispatch(addProjectId(id))
    }

    const getUsersData = () => {
        const data = {
          token : userInfo.token,
        }
        getUsers(data)
          .then(async (response) => {
            if(response.user) {
              let userList = response.user.map(userData => {
                console.log(userData.isEmailVerified)
                return {
                  _id: userData.id,
                  name : userData.name,
                  email: userData.email,
                  verified : userData.isEmailVerified.toString(),
                  role: userData.role
                }
              })
              setData(userList);
            }
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            alert('Something went wrong');
          });
    }

    const handleEdit = (id) => {
      console.log(id)
    }

    const handleDelete = (id) => {
      const data = {
        id : id,
        token : userInfo.token,
      }
      deleteUser(data)
      .then(async (response) => {
        console.log(response);
        if(response.message) {
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
                    <Card.Title as="h5">Users</Card.Title>
                </Card.Header>
                <Card.Body>
                <Button type="primary" onClick={showModal}>
                  Open Modal
                </Button>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
                    {/* <DataTable 
                        columns={columns}
                        data={data}
                        pagination
                        highlightOnHover={true}
                        responsive={true}
                    /> */}
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}