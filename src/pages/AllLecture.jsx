import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/styles/AllLecture.scss";
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
import {
  getAllChapters,
  getAllLectures,
  getBook,
  getChapter,
} from "../features/apiCall";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";

const AllLecture = () => {
  const { lectures } = useSelector((state) => state.lecture);
  const { token, role } = useSelector((state) => state.auth);
  const { chapter } = useSelector((state) => state.chapter);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chapterId } = useParams();

  const [loading, setLoading] = useState(false);
  const [lectureNo, setlectureNo] = useState(0);
  const [createLoad, setCreateLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title) {
        return toast.error("Please fill all the fields");
      }
      setCreateLoad(true);
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", video);

      const { data } = await axiosInstance.post(
        `/api/lecture/create-lecture/${chapterId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        onClose();
        getChapter(dispatch, setLoading, chapterId, token);
        setCreateLoad(false);
        setTitle("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setCreateLoad(false);
    }
  };

  useEffect(() => {
    getChapter(dispatch, setLoading, chapterId, token);
    getAllLectures(dispatch, setLoading, chapterId, token);
  }, [createLoad]);

  const handleClose = () => {
    onClose();
    setTitle("");
  };

  return (
    <>
      <div className="allclass">
        <h1>All Lectures - {chapter?.title}</h1>
        {role === "admin" && (
          <Button className="add" onClick={onOpen}>
            Add New Lecture
          </Button>
        )}
        {lectures && lectures.length > 0 ? (
          <>
            <div className="course">
              <div className="course-box1">
                <video
                  autoPlay
                  controls
                  src={lectures[lectureNo].video.url}
                  controlsList="nodownload noremoteplayback"
                  // disablePictureInPicture
                  // disableRemotePlayback
                ></video>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginTop: "1rem",
                  }}
                >{`#${lectureNo + 1} ${lectures[lectureNo].title}`}</h2>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Description
                </h2>
                <p>{lectures[lectureNo].description}</p>
              </div>
              <div className="course-box2">
                <div>
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Course Overview
                  </h2>
                  <div className="lectureno">
                    {lectures.map((item, index) => (
                      <button
                        key={item._id}
                        onClick={() => setlectureNo(index)}
                        className={lectureNo === index ? "active" : ""}
                      >
                        <p>
                          #{index + 1} {item.title}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginTop: "1rem",
                    }}
                  >
                    Comment Section
                  </h2>
                  <p style={{ marginTop: "1rem" }}>
                    
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1
            style={{
              marginTop: "3rem",
              fontSize: "2rem",
            }}
          >
            No lectures found
          </h1>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Lecture</ModalHeader>
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
                <FormLabel>Video</FormLabel>
                <Input
                  onChange={handleVideoChange}
                  type="file"
                  accept="video/*"
                  required
                />
              </Box>
              {video && (
                <video src={URL.createObjectURL(video)} alt="img"></video>
              )}
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

export default AllLecture;
