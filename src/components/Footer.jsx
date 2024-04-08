

"use client";

import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
// import fbIcon from "../media/fbicon.png";
// import twitterIcon from "../media/twittericon.png";
// import linkedinIcon from "../media/linkedinicon.png";

const Footer = () => {
    const CustomContainer = styled(Container)(({ theme }) => ({
        display: "flex",
        justifyContent: "space-around",
        gap: theme.spacing(4),
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            textAlign: "center",
        },
    }));

    const IconBox = styled(Box)(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
        },
    }));

    const FooterLink = styled("span")(({ theme }) => ({
        fontSize: "16px",
        color: "#7A7A7E",
        fontWeight: "300",
        cursor: "pointer",
        "&:hover": {
            color: "#009bd6",
        },
    }));

    return (
        <Box sx={{ py: 4, backgroundColor: "#001f2b" }}>
            <CustomContainer>
                <CustomContainer>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                color: "white",
                                fontWeight: "700",
                                mb: 2,
                            }}
                        >
                            Help
                        </Typography>

                        <FooterLink>Track your questions</FooterLink>
                        <br />
                        <FooterLink>Community Support</FooterLink>
                        <br />
                        <FooterLink>Community Guidlines</FooterLink>
                        <br />
                        <FooterLink>Help</FooterLink>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                color: "white",
                                fontWeight: "700",
                                mb: 2,
                            }}
                        >
                            Chirag
                        </Typography>

                        <FooterLink>About</FooterLink>
                        <br />
                        <FooterLink>Terms of use</FooterLink>
                        <br />
                        <FooterLink>Contact Us</FooterLink>
                        <br />
                        <FooterLink>Jobs</FooterLink>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                color: "white",
                                fontWeight: "700",
                                mb: 2,
                            }}
                        >
                            Get in touch
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "16px",
                                color: "#7A7A7E",
                                fontWeight: "500",
                                mb: 2,
                            }}
                        >
                            Join the community
                        </Typography>

                        {/* <IconBox>
                            <img
                                src={fbIcon}
                                alt="fbIcon"
                                style={{ cursor: "pointer" }}
                            />
                            <img
                                src={twitterIcon}
                                alt="twitterIcon"
                                style={{ cursor: "pointer" }}
                            />
                            <img
                                src={linkedinIcon}
                                alt="linkedinIcon"
                                style={{ cursor: "pointer" }}
                            />

                        </IconBox> */}
                    </Box>
                </CustomContainer>
            </CustomContainer>
        </Box>
    );
};

export default Footer;