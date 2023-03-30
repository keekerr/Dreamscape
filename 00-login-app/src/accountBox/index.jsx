import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import { motion } from "framer-motion";

const BoxContainer = styled.div`
    width: 280px;
    min-height: 550px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
`;

const TopContainer = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
    width: 160%;
    height: 550px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    transform: rotate(60degrees);
    top: -290px;
    left: -70px;
    background: gray;
`;

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const HeaderText = styled.h2`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.24;
    color: black;
    z-index: 10;
    margin: 0;
`;

const SmallText = styled.h5`
    color: black;
    font-weight: 500;
    font-size: 11px;
    z-index: 10;
    margin: 0;
    margin-top: 7px;
`;

const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1.8em;
`;

const backdropVariants = {
    expanded: {
        width: "233%",
        height: "1050px",
        borderRadius: "20%",
        transform: "rotate(60deg)"
    },
    collapsed: {
        width: "160%",
        height: "550px",
        borderRadius: "50%",
        transform: "rotate(60deg)"
    }
}

export function AccountBox(props) {
    const [isExpanded, setExpanded] = useState(false);

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, 3000);
    };

    return (
        <BoxContainer>
            <TopContainer>
            <BackDrop initial={false} animate={isExpanded ? "expanded" : "collapsed"} variants={backdropVariants} />
            <HeaderContainer>
                <HeaderText>Welcome</HeaderText>
                <HeaderText>Back</HeaderText>
                <SmallText>Please sign-in to continue!</SmallText>
            </HeaderContainer>
            </TopContainer>
            <InnerContainer>
                <LoginForm />
                <p onClick={playExpandingAnimation}>test!</p>
            </InnerContainer>
        </BoxContainer>
    );
};
