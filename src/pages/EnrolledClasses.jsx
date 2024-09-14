import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/AllClass.scss";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getEnrolledClass } from "../features/apiCall";

const EnrolledClasses = () => {
  const { enrolledClasses } = useSelector((state) => state.class);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getEnrolledClass(dispatch, token);
  }, [dispatch, token]);

  return (
    <>
      <div className="allclass">
        <h1>All Enrolled Class</h1>
        <div className="classes">
          {enrolledClasses && enrolledClasses.length > 0 ? (
            enrolledClasses.map((c, i) => (
              <div key={i} className="classcard">
                <img src={c.image.url} alt="img" />
                <div>
                  <h3>Title: {c.title}</h3>
                  <p>Description: {c.description}</p>
                  <div className="btn">
                    <Button
                      onClick={() => navigate(`/book/${c._id}`)}
                      colorScheme="teal"
                      variant="outline"
                    >
                      View Class
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
    </>
  );
};

export default EnrolledClasses;
