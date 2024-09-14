import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";
import { setComments } from "./commentSlice";
import { setClass, setClasses, setEnrolledClasses } from "./classSlice";
import { setBook, setBooks } from "./bookSlice";
import { setChapter, setChapters } from "./chapterSlice";
import { setLecture, setLectures } from "./lectureSlice";

export const getAllClasses = async (dispatch, setLoading, token) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get("/api/class/get-all-class", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      setLoading(false);
      dispatch(
        setClasses({
          classes: data.classes,
        })
      );
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getClass = async (dispatch, setLoading, id, token) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(`/api/class/get-class/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      setLoading(false);
      dispatch(
        setClass({
          class: data.class,
        })
      );
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getEnrolledClass = async (dispatch, setLoading, id, token) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(
      `/api/class/get-enrolled-classes`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setLoading(false);
      dispatch(
        setEnrolledClasses({
          enrolledClasses: data.enrolledClasses,
        })
      );
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getAllBooks = async (dispatch, setLoading, classId, token) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(
      `/api/book/get-all-books/${classId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setLoading(false);
      dispatch(
        setBooks({
          books: data.books,
        })
      );
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getBook = async (dispatch, setLoading, bookId, token) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(`/api/book/get-book/${bookId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      setLoading(false);
      dispatch(
        setBook({
          book: data.book,
        })
      );
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getAllChapters = async (dispatch, setLoading, bookId, token) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(
      `/api/chapter/get-all-chapters/${bookId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setLoading(false);
      dispatch(
        setChapters({
          chapters: data.chapters,
        })
      );
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getChapter = async (dispatch, setLoading, chapterId, token) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(
      `/api/chapter/get-chapter/${chapterId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setLoading(false);
      dispatch(
        setChapter({
          chapter: data.chapter,
        })
      );
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getAllLectures = async (
  dispatch,
  setLoading,
  chapterId,
  token
) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(
      `/api/lecture/get-all-lectures/${chapterId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setLoading(false);
      dispatch(
        setLectures({
          lectures: data.lectures,
        })
      );
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getLecture = async (dispatch, setLoading, lectureId, token) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(
      `/api/lecture/get-lecture/${lectureId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setLoading(false);
      dispatch(
        setLecture({
          lecture: data.lecture,
        })
      );
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getAllComments = async (
  dispatch,
  setLoading,
  lectureId,
  token
) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(
      `/api/comment/get-all-comments/${lectureId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setLoading(false);
      dispatch(
        setComments({
          comments: data.comments,
        })
      );
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};
