import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { baseURL, deleteRequest, postRequest, putRequest } from "../Utils/APIRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UseUserSocialMedia from "../Hooks/UseUserSocialMedia";


const StateContext = createContext();



export const ContextProvider = ({ children }) => {
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const { isFacebookConnected } = UseUserSocialMedia();
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [registerInfo, setRegisterInfo] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });
    const [postContent, setPostContent] = useState({
        user: '',
        content: '',
        platform: '',
        scheduledAt:'',
        image: null,
    })

    
    useEffect(() => {
        if ( token !== null) {
            const parsedToken = JSON.parse(token);
            const userId = parsedToken._id;
            
            if(userId){
                setIsAuthenticated(true);
            }

            setUser(parsedToken)
        }

        setLoading(false);
    }, [token]);

    useEffect(() => {
        if (user && user._id) {
            setPostContent((prevContent) => ({
                ...prevContent,
                user: user._id,
            }));
        }
    }, [user]);
    

    

    
    //registering new user
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    
    const registerUser = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                const res = await postRequest(
                    `${baseURL}/auth/register`,
                    JSON.stringify(registerInfo)
                );

                if (res.error) {
                    toast.error(res.message);
                } else {
                    toast.success(res.message);
                    // Navigate to home page
                }
            }catch (err) {
                console.log(err.response?.data.message || err.message);
            }
            setLoading(false);
        },
        [registerInfo]
    );

    //login a user 
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const loginUser = useCallback(
        async (e) => {
            e.preventDefault();
            setLoading(true);

            try {
                const res = await postRequest(
                    `${baseURL}/auth/login`,
                    JSON.stringify(loginInfo)
                );

                // Code to authenticate the user
                localStorage.setItem("token", JSON.stringify(res));

                setUser(res);
                

                if (res.error) {
                    toast.error(res.message);
                } else {
                    toast.success(res.message);
                    // Navigate to dashboard
                    if(isFacebookConnected === true){
                        Navigate("/schedule");
                    }else{
                        Navigate("/platforms");
                    }
                    
                }
            } catch (err) {
                console.log(err);
            }

            setLoading(false);
        },
        [loginInfo, Navigate, isFacebookConnected]
    );
    
    //Sign-out function
    const signOutUser = useCallback(() => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false)
        Navigate('/auth')
    }, [Navigate]);

    //facebook authentication 
    const addFacebookAccount = async()=>{
        try{
            
            window.location.href = `${baseURL}/auth/facebook`;

            
        }catch(err){
            console.log("error", err)
            toast.error('Failed to authenticate with Facebook.');
        }
    }
    

    //Publish Post 
    const updatePostContent = useCallback((info) => {
        setPostContent(info);
    }, []);

    const publishPost = useCallback(
        async (e)=>{
            e.preventDefault();
            try{
                const res = await postRequest(
                    `${baseURL}/post/publish`,
                    JSON.stringify(postContent)
                );

                if (res.error) {
                    toast.error(res.message);
                } else {
                    toast.success(res.message);
                    setPostContent({
                        user: user._id,
                        content: '',
                        platform: '',
                        scheduledAt:'',
                        image: null,
                    })
                    Navigate('/schedule')
                }

            }catch(err){
                console.log(err)
            }
            setLoading(false);
        }, [postContent, Navigate, user]
    );

    //update scheduled post
    const updatePost = useCallback(async (postId, e) => {
        e.preventDefault();
        
        try {
            const res = await putRequest(
                `${baseURL}/post/update/${postId}`, 
                JSON.stringify(postContent)
            );
        
            
            if (res.error) {
                toast.error(res.message);
            } else {
                toast.success(res.message);
                Navigate('/schedule');
            }
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }, [postContent, Navigate]);

    //Delete scheduled post
    const deletePost = async (postId) => {
        try {
            const res = await deleteRequest(
                `${baseURL}/post/delete/${postId}`, 
            );
        
            if (res.error) {
                toast.error(res.message);
            } else {
                toast.success(res.message);
            }
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    return (
            <>
            <StateContext.Provider
                value={{ 
                    isMenuCollapsed,
                    setIsMenuCollapsed,
                    screenSize,
                    setScreenSize,
                    isAuthenticated,
                    registerInfo,
                    loading,
                    updateRegisterInfo,
                    registerUser,
                    updateLoginInfo,
                    loginInfo,
                    loginUser,
                    signOutUser,
                    addFacebookAccount, 
                    publishPost, 
                    updatePostContent,
                    postContent, 
                    setPostContent,
                    updatePost,
                    deletePost
                }}
            >
                {children}
            </StateContext.Provider>
            </>
        )
}

export const UseStateContext = () => useContext(StateContext)