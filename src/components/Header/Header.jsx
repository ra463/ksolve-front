import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";
import { HiMenuAlt1 } from "react-icons/hi";
import { FiHome, FiLogOut } from "react-icons/fi";
import { AiOutlineBook } from "react-icons/ai";
import { GiBlackBook } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../features/authSlice";
import toast from "react-hot-toast";

const AllLinks = ({ url = "/", title = "Home" }) => (
  <Link to={url}>
    <Button>{title}</Button>
  </Link>
);

const Header = ({ user }) => {
  const { token } = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    onClose();
    e.preventDefault();
    dispatch(removeToken());
    localStorage.clear();
    toast.success("Logout Successfully");
  };

  return (
    <>
      <div className="header">
        <div className="header__logo">
          <span>Ksolves</span>
        </div>
        <div className="header__menu">
          {token ? (
            <>
              <Link to="/" className="logout">
                <Button onClick={logoutHandler}>Logout</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="login">
                <Button style={{ border: "2px solid #ffb5c2" }}>Login</Button>
              </Link>
              <Link to="/register" className="register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
          <Button onClick={onOpen}>
            <HiMenuAlt1 />
          </Button>
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay backdropFilter={"blur(3px)"} />
            <DrawerContent>
              <DrawerHeader className="d_head">
                <BsReverseLayoutSidebarInsetReverse className="header__menu__icon" />
                <span>Ksolves</span>
              </DrawerHeader>
              <DrawerBody className="drawer__body">
                <p onClick={onClose}>
                  <FiHome />
                  <AllLinks url="/" title="Home" />
                </p>
                <p onClick={onClose}>
                  <AiOutlineBook />
                  <AllLinks url="/all-class" title="All Classes" />
                </p>
                {token && (
                  <>
                    <p onClick={onClose}>
                      <CgProfile />
                      <AllLinks url="/my-profile" title="My Profile" />
                    </p>
                    <p onClick={onClose}>
                      <GiBlackBook />
                      <AllLinks url="/my-class" title="My Classes" />
                    </p>
                    <p onClick={onClose}>
                      <FiLogOut />
                      <Link to="/">
                        <Button onClick={logoutHandler}>Logout</Button>
                      </Link>
                    </p>
                  </>
                )}
              </DrawerBody>
              {!token && (
                <div className="btns">
                  <Link onClick={onClose} to="/login">
                    <Button>Login</Button>
                  </Link>
                  <Link onClick={onClose} to="/register">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default Header;
