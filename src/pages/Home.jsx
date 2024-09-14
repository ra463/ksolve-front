import React from "react";
import "../components/styles/Home.scss";
import { Button } from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import { BiBookBookmark } from "react-icons/bi";
import { FaGgCircle } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <div className="container-1">
          <img src="./school.webp" alt="img" />
          <div className="intro">
            <h2>Move beyond the limitations of e-learning.</h2>
            <p>Anytime, anywhere to do discover yourself.</p>
            <Link to="/all-class">
              <Button marginTop={"6"} size={"lg"} colorScheme="blue">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
        <div className="container-2">
          <div>
            <FaGgCircle /> <p>Online Tutoring</p>
          </div>
          <div>
            <FiClock />
            <p>Lifetime Access</p>
          </div>
          <div>
            <BsFillPersonFill />
            <p>Active Learning</p>
          </div>
          <div>
            <BiBookBookmark />
            <p>10K Courses</p>
          </div>
        </div>
        <div className="container-3">
          <div className="know-1">
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
              }}
            >
              Learn About Us
            </h2>
            <p>
              We are a team of passionate learners who love to share knowledge.
              As you know that knowledge is power. We are here to help you
              discover and share knowledge. Our content will help you to learn
              and discover yourself at your every step .
            </p>

            <ul>
              <li>Our content is very cheap to buy.</li>
              <li>It's safe to buy our content.</li>
              <li>We are always ready to help you.</li>
              <li>The course we provide are of top quality.</li>
            </ul>
          </div>
          <div className="know-2">
            <img alt="img" src="./learn.jpg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
