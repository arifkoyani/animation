
import React, { useState, useEffect } from "react";
import "./Table.css";
import MUIDataTable from "mui-datatables";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddForm from "./AddForm";

export default function BasicTable() {
  const [productList, setProductList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (() => {

  });

  const handleDelete = (() => {

  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products"); // Change the URL as needed
      const data = await response.json();

      const productList = data.map((product) => ({
        title: product.title,
        price: product.price,
        description: product.description,
        image: `http://localhost:5000/${product.image}`,
        category: product.category,
      }));
      setProductList(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const columns = [
    {
      name: "title",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "image",
      label: "Image",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <img src={value} alt="Product" style={{ width: "50px" }} />
        ),
      },
    },
    {
      name: "category",
      label: "Category",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
        name: "actions", // Custom column for Edit and Delete buttons
        label: "Actions",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            const productId = tableMeta.rowData[7]; // Assuming productId is in the 7th column
            return (
              <div>
                <button
                  style={{
                    background: "green",
                    color: "white",
                    marginRight: "5px",
                  }}
                  onClick={() => handleEdit(productId)}
                >
                  Edit
                </button>
                <button
                  style={{
                    background: "red",
                    color: "white",
                  }}
                  onClick={() => handleDelete(productId)}
                >
                  Delete
                </button>
              </div>
            );
          },
        },
    }
  ];

  const options = {
    filter: false,
    print: false, 
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50],
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="Table">
      <h3>All Products</h3>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add New Product
      </Button>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div>
          <AddForm onClose={handleCloseModal} /> 
        </div>
      </Modal>
      <div>
        <MUIDataTable
          title=""
          data={productList}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}