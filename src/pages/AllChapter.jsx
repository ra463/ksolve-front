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
import { getAllChapters, getBook } from "../features/apiCall";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";

const AllChapter = () => {
  const { book } = useSelector((state) => state.book);
  const { token, role } = useSelector((state) => state.auth);
  const { chapters } = useSelector((state) => state.chapter);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId } = useParams();

  const [loading, setLoading] = useState(false);
  const [createLoad, setCreateLoad] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title) {
        return toast.error("Please fill all the fields");
      }
      setCreateLoad(true);

      const { data } = await axiosInstance.post(
        `/api/chapter/create-chapter/${bookId}`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        onClose();
        getAllChapters(dispatch, setLoading, bookId, token);
        setCreateLoad(false);
        setTitle("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setCreateLoad(false);
    }
  };

  useEffect(() => {
    getBook(dispatch, setLoading, bookId, token);
    getAllChapters(dispatch, setLoading, bookId, token);
  }, [createLoad]);

  const handleClose = () => {
    onClose();
    setTitle("");
  };

  return (
    <>
      <div className="allclass">
        <h1>All Chapter - {book?.title}</h1>
        {role === "admin" && (
          <Button className="add" onClick={onOpen}>
            Add New Chapter
          </Button>
        )}
        <div className="books">
          {loading && <Spinner className="spinner" />}
          {chapters && chapters.length > 0 ? (
            chapters.map((b, i) => (
              <div key={i} className="bookcard">
                <div className="details">
                  <h3>Title: {b.title}</h3>
                </div>
                <div className="btn">
                  <Button
                    colorScheme="blue"
                    onClick={() =>
                      navigate(`/book/chapter/all-lecture/${b._id}`)
                    }
                  >
                    View Chapter
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <span>No Chapters Found</span>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Chapter</ModalHeader>
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

export default AllChapter;
