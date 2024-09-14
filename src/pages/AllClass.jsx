import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses } from "../features/apiCall";

const AllClass = () => {
  const { classes } = useSelector((state) => state.class);
  const { token } = useSelector((state) => state.auth);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllClasses(dispatch, setLoading, token);
  }, []);

  return (
    <div className="allclass">
      <h2>All Class</h2>
      <div className="classes">
        {classes && classes.length > 0 ? (
          classes.map((c, i) => (
            <div className="classcard">
              <img src={c.image.url} alt="img" />
              <div>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <button
                  onClick={() => {
                    onOpen();
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <span>No Classes Found</span>
        )}
      </div>
    </div>
  );
};

export default AllClass;
