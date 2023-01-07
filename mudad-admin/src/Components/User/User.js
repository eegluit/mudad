import React, {useEffect, useState} from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';
import {getUsers, deleteUser} from "../../services/user";
import { useSelector } from 'react-redux';
import DataTable from "react-data-table-component";
import {AiFillEdit} from "react-icons/ai"
import {RiDeleteBin6Line} from "react-icons/ri"

export const User = () => {
    const [isLoading, setLoading] = useState(false);
    const userInfo = useSelector((state) => state.userInfo);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([
      { name: `Name`, selector: "name" },
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
                    <DataTable 
                        columns={columns}
                        data={data}
                        pagination
                    />
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}