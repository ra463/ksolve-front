import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Image,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllComments,
  getAllLectures,
  getChapter,
} from "../features/apiCall";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";

const AllLecture = () => {
  const { lectures } = useSelector((state) => state.lecture);
  const { token, role, id } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const { chapter } = useSelector((state) => state.chapter);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: commentIsOpen,
    onOpen: commentOnOpen,
    onClose: commentOnClose,
  } = useDisclosure();
  const dispatch = useDispatch();
  const { chapterId } = useParams();

  const [loading, setLoading] = useState(false);
  const [createLoad, setCreateLoad] = useState(false);
  const [commentLoad, setCommentLoad] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [lectureNo, setlectureNo] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [video, setVideo] = useState("");

  let LectureId = lectures[lectureNo]?._id;

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!content) {
        return toast.error("Please fill all the fields");
      }
      setCreateLoad(true);

      const { data } = await axiosInstance.post(
        `/api/comment/create-comment/${LectureId}`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        onClose();
        getAllComments(dispatch, setCommentLoad, LectureId, token);
        setCreateLoad(false);
        setContent("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setCreateLoad(false);
    }
  };

  const handleReply = async (id) => {
    commentOnOpen();
    setCommentId(id);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      if (!content) {
        return toast.error("Please fill all the fields");
      }
      setCreateLoad(true);

      const { data } = await axiosInstance.post(
        `/api/comment/reply-comment/${commentId}`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        onClose();
        getAllComments(dispatch, setCommentLoad, LectureId, token);
        setCreateLoad(false);
        setContent("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setCreateLoad(false);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this comment?")) {
        return;
      }
      const { data } = await axiosInstance.delete(
        `/api/comment/delete-comment/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllComments(dispatch, setCommentLoad, LectureId, token);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getChapter(dispatch, setLoading, chapterId, token);
    getAllLectures(dispatch, setLoading, chapterId, token);
  }, [createLoad]);

  useEffect(() => {
    if (LectureId) {
      getAllComments(dispatch, setCommentLoad, LectureId, token);
    }
  }, [LectureId]);

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
                <div className="details">
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
              </div>
              <div className="course-box2">
                <div className="lecture_details">
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
                <div className="comment_section">
                  <h2 className="comment_head">Comment Section</h2>
                  <div className="comment">
                    <div className="send">
                      <Input
                        className="input"
                        placeholder="Write a comment"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        type="text"
                      />
                      <Button onClick={handleCommentSubmit}>Send</Button>
                    </div>
                  </div>
                  <div className="all_comments">
                    {commentLoad && <Spinner />}
                    {comments && comments.length > 0 ? (
                      comments.map((item, index) => (
                        <div key={index} className="comment_body">
                          <div className="comment">
                            <div className="comment_content">
                              <div className="names">
                                <Image src="/learn.jpg" />
                                <span>{item.user?.name}</span>
                              </div>
                              <span className="c">{item.content}</span>
                            </div>
                            <div className="reply">
                              <Button onClick={() => handleReply(item._id)}>
                                Reply
                              </Button>
                              {id === item.user?._id && (
                                <MdDelete
                                  onClick={() => handleDeleteComment(item._id)}
                                />
                              )}
                            </div>
                          </div>
                          {item.replies && item.replies.length > 0
                            ? item.replies.map((reply, index) => (
                                <div className="comment reply" key={index}>
                                  <div className="comment_content">
                                    <div className="names">
                                      <Image src="/learn.jpg" />
                                      <span>{reply.user?.name}</span>
                                    </div>
                                    <span className="c">{reply.content}</span>
                                  </div>
                                </div>
                              ))
                            : null}
                        </div>
                      ))
                    ) : (
                      <p>No comments found</p>
                    )}
                  </div>
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
      <Modal isOpen={commentIsOpen} onClose={commentOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Reply</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl className="form">
              <Box>
                <FormLabel>Content</FormLabel>
                <Input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  type="text"
                  required
                  placeholder="Content of the reply"
                />
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              onClick={handleReplySubmit}
              colorScheme="blue"
              mr={3}
            >
              {createLoad ? <Spinner /> : "Submit"}
            </Button>
            <Button onClick={commentOnClose} colorScheme="red">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AllLecture;
