import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { server } from '../../../server';
import toast from 'react-hot-toast';

const Otp = () => {

        const navigate = useNavigate();
        const [otp, setOtp] = useState(new Array(6).fill(""));
        const [activeOTPIndex, setActiveOTPIndex] = useState(0);
        const [color, setColor] = useState(
          "border-gray-400 focus:border-gray-700 focus:text-gray-700"
        );
      
        const inputRef = useRef(null);
      
        const handleOnChange = ({ target }) => {
          const { value } = target;
          const newOTP = [...otp]; // Copy the current OTP array
      
          let startIndex = activeOTPIndex;
          for (let i = 0; i < value.length && startIndex < 6; i++) {
            newOTP[startIndex] = value[i];
            startIndex++;
          }
      
          setOtp(newOTP);
      
          // Set the active index based on the length of the value
          if (startIndex <= 5) {
            setActiveOTPIndex(startIndex);
          } else {
            setActiveOTPIndex(5);
          }
        };
      
        // console.log(otp);
      
        const handleOnKeyDown = ({ key }, index) => {
          setColor("border-gray-400 focus:border-gray-700 focus:text-gray-700");
          const currentOTPIndex = index;
      
          if (key === "Backspace") {
            const newOTP = [...otp];
            newOTP[currentOTPIndex] = ""; // Clear the current input
      
            if (currentOTPIndex > 0) {
              setActiveOTPIndex(currentOTPIndex - 1);
            }
      
            setOtp(newOTP);
          }
        };
      
        const onSubmit = async (otpString) => {
          try {
            const response = await fetch(`${server}/activation`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              mode: "cors",
              credentials: "include",
              body: JSON.stringify({ otpString }),
            });
            if (response.ok) {
              const res = await response.json();
              toast.success("Your account has been created successfully!");
              navigate('/dashboard')
            } else {
              setColor("border-red-400");
              const errorResponse = await response.json();
              toast.error(errorResponse.error);
              console.log(errorResponse);
            }
          } catch (error) {
            console.log(error);
            toast(error.message);
          }
        };
      
        useEffect(() => {
          inputRef.current?.focus();
        }, [activeOTPIndex]);
      
        useEffect(() => {
          const isOTPComplete = otp.every((value) => value !== "");
          if (isOTPComplete) {
            const otpString = otp.join("");
            // console.log(otpString);
            // setIsLoading(true);
            onSubmit(otpString);
          }
        }, [otp]);
        return (
          <div className="">
            <div className="flex h-screen w-screen flex-col items-center justify-center">
              <a
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 absolute left-4 top-4 md:left-8 md:top-8"
                href="/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="mr-2 h-4 w-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Back
              </a>
              <div className="mx-auto flex md:w-full flex-col justify-center space-y-6 w-[80%]">
                <div className="flex flex-col space-y-2 text-center">
                  {/* <img
                    alt="logo"
                    loading="lazy"
                    width="80"
                    height="80"
                    decoding="async"
                    data-nimg="1"
                    className="mx-auto"
                    src="/logo.svg"
                    style="color: transparent;"
                  /> */}
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Activate Your Account
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Please enter your OTP
                  </p>
                </div>
                <div className="pt-3">
                  <div className="w-[80%] flex justify-center mx-auto">
                    <div className="flex justify-center items-center space-x-2">
                      {otp.map((_, index) => {
                        return (
                          <React.Fragment key={index}>
                            <input
                              ref={index === activeOTPIndex ? inputRef : null}
                              type="number"
                              className={`w-[35px] h-[35px] md:w-[45px] md:h-[45px] border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none ${color} text-gray-400 transition`}
                              onChange={handleOnChange}
                              onKeyDown={(e) => handleOnKeyDown(e, index)}
                              value={otp[index]}
                            />
                          </React.Fragment>
                        );
                      })}
                      {/* {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        ""
                      )}{" "} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
}

export default Otp