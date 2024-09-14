import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/styles/AllClass.scss";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getClass } from "../features/apiCall";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";

const AllBook = () => {
  const { clas } = useSelector((state) => state.class);
  const { books } = useSelector((state) => state.book);
  const { token, role } = useSelector((state) => state.auth);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [createLoad, setCreateLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title || !description) {
        return toast.error("Please fill all the fields");
      }
      setCreateLoad(true);

      const { data } = await axiosInstance.post(
        `/api/book/create-book/${id}`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        onClose();
        getAllBooks(dispatch, setLoading, id, token);
        setCreateLoad(false);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setCreateLoad(false);
    }
  };

  useEffect(() => {
    getClass(dispatch, setLoading, id, token);
    getAllBooks(dispatch, setLoading, id, token);
  }, [createLoad]);

  const handleClose = () => {
    onClose();
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <div className="allclass">
        <h1>All Book - {clas?.title}</h1>
        {role === "admin" && (
          <Button className="add" onClick={onOpen}>
            Add New Book
          </Button>
        )}
        <div className="books">
          {loading && <Spinner className="spinner" />}
          {books && books.length > 0 ? (
            books.map((b, i) => (
              <div key={i} className="bookcard">
                <div className="details">
                  <h3>Title: {b.title}</h3>
                  <p>Description: {b.description}</p>
                </div>
                <div className="btn">
                  <Button
                    colorScheme="blue"
                    onClick={() => navigate(`/book/chapter/${b._id}`)}
                  >
                    View Book
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <span>No Books Found</span>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl className="form">
              <Box>
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  required
                  placeholder="Title of the book"
                />
              </Box>
              <Box>
                <FormLabel>Description</FormLabel>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  required
                  placeholder="Small Description"
                />
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              onClick={handleSubmit}
              colorScheme="blue"
              mr={3}
            >
              {createLoad ? <Spinner /> : "Submit"}
            </Button>
            <Button onClick={handleClose} colorScheme="red">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AllBook;
