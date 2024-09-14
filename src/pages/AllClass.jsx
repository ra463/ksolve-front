import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses, getEnrolledClass } from "../features/apiCall";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";

const AllClass = () => {
  const { classes, enrolledClasses } = useSelector((state) => state.class);
  const { token, role } = useSelector((state) => state.auth);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [createLoad, setCreateLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title || !description || !image) {
        return toast.error("Please fill all the fields");
      }
      setCreateLoad(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", image);

      const { data } = await axiosInstance.post(
        "/api/class/create-class",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        onClose();
        setCreateLoad(false);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setCreateLoad(false);
    }
  };

  const handleEnroll = async (classId) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/class/enroll/${classId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getAllClasses(dispatch, setLoading, token);
    getEnrolledClass(dispatch, token);
  }, [createLoad]);

  const handleClose = () => {
    onClose();
    setTitle("");
    setDescription("");
    setImage("");
  };

  return (
    <>
      <div className="allclass">
        <h1>All Class</h1>
        {role === "admin" && (
          <Button className="add" onClick={onOpen}>
            Add New Class
          </Button>
        )}
        <div className="classes">
          {loading && <Spinner className="spinner" />}
          {classes && classes.length > 0 ? (
            classes.map((c, i) => (
              <div key={i} className="classcard">
                <img src={c.image.url} alt="img" />
                <div>
                  <h3>Title: {c.title}</h3>
                  <p>Description: {c.description}</p>
                  <div className="btn">
                    {enrolledClasses &&
                      enrolledClasses.map(
                        (e) =>
                          e._id === c._id && (
                            <Button
                              onClick={() => navigate(`/book/${c._id}`)}
                              colorScheme="teal"
                              variant="outline"
                            >
                              View
                            </Button>
                          )
                      )}
                    <Button
                      onClick={() => handleEnroll(c._id)}
                      colorScheme="teal"
                    >
                      {enrolledClasses &&
                      enrolledClasses
                        .map((enroll) => {
                          return enroll._id;
                        })
                        .includes(c._id)
                        ? "Enrolled"
                        : "Enroll"}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span>No Classes Found</span>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Class</ModalHeader>
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
                  placeholder="Title of the class"
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
              <Box>
                <FormLabel>Image</FormLabel>
                <Input
                  onChange={handleImageChange}
                  type="file"
                  accept="image/*"
                  required
                />
              </Box>
              {image && <Image src={URL.createObjectURL(image)} alt="img" />}
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

export default AllClass;
