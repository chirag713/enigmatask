


"use client"


import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from '@mui/icons-material/Quiz';
import { Container } from "@mui/system";
import CustomButton1 from "./CustomButton1";
import AddBoxIcon from '@mui/icons-material/AddBox';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Link from 'next/link'
import { logoutuser } from '@/services/userservice'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
} from "@mui/material";
import { useState } from "react";
import UserContext from "@/app/context/usercontext";

export const Navbar = () => {
    const context = React.useContext(UserContext);
    const router = useRouter();

    async function dologout() {
        console.log("hello");
        try {
            const result = await logoutuser();
            console.log(result);
            context.setUser(undefined);
            router.push("/signinpage");
        } catch (error) {
            toast.error("Logout error", {
                position: "top-center",
            });
        }
    }

    const [mobileMenu, setMobileMenu] = useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.type === "Tab" || event.type === "Shift")
        ) {
            return;
        }

        setMobileMenu({ ...mobileMenu, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {[
                    { text: "Home", icon: <HomeIcon />, link: "/" },
                    { text: "My Questions", icon: <QuizIcon />, link: "/showtask" },
                    { text: "Add Question", icon: <AddBoxIcon />, link: "/addtask" },
                    { text: "All Questions", icon: <QuestionAnswerIcon />, link: "/showalltasks" },
                ].map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <Link href={item.link} passHref>
                            <ListItemButton component="a">
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const NavLink = styled(Typography)(({ theme }) => ({
        fontSize: "16px",
        color: "#4F5361",
        fontWeight: "bold",
        cursor: "pointer",
        "&:hover": {
            color: "#FFC000",
        },
    }));

    const NavbarLinksBox = styled(Box)(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing(3),
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    }));

    const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
        cursor: "pointer",
        display: "none",
        marginRight: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            display: "block",
        },
    }));

    const NavbarContainer = styled(Container)(({ theme }) => ({
        display: "flex",
        // backgroundColor:"#E6F0FF",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(5),
        [theme.breakpoints.down("md")]: {
            padding: theme.spacing(2),
        },
    }));

    return (
        <NavbarContainer>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2.5rem",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CustomMenuIcon onClick={toggleDrawer("left", true)} />
                    <Drawer
                        anchor="left"
                        open={mobileMenu["left"]}
                        onClose={toggleDrawer("left", false)}
                    >
                        {list("left")}
                    </Drawer>
                    {/* <NavbarLogo src={logoImg} alt="logo" /> */}
                </Box>

                <NavbarLinksBox>
                    <NavLink variant="body2">Home</NavLink>
                    {
                        context.user && (
                            <>
                                <Link href={"/showtask"}>
                                    <NavLink variant="body2">My Questions</NavLink>
                                </Link>
                                <Link href={"/addtask"}>
                                    <NavLink variant="body2">Add Question</NavLink>
                                </Link>
                                <Link href={"/showalltasks"}>
                                    <NavLink variant="body2">All Questions</NavLink>
                                </Link>
                            </>
                        )
                    }

                    {/* <NavLink variant="body2">Contact</NavLink> */}
                </NavbarLinksBox>
            </Box >

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                }}
            >
                {
                    context.user && <>

                        <button onClick={dologout}>
                            <CustomButton1
                                backgroundColor="#0F1B4C"
                                color="#fff"
                                buttonText="Sign Out"
                            />
                        </button>

                    </>
                }

                {
                    !context.user && <>

                        <Link href={"/signinpage"}>
                            <CustomButton1
                                backgroundColor="#0F1B4C"
                                color="#fff"
                                buttonText="Log-In"
                            />
                        </Link>
                        <Link href="/signuppage">
                            <CustomButton1
                                backgroundColor="#0F1B4C"
                                color="#fff"
                                buttonText="Sign Up"
                            />
                        </Link>
                    </>
                }
            </Box>
        </NavbarContainer >
    );
};

export default Navbar;
