/*eslint-disable*/
import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import axios from "axios";
import styled from "styled-components";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const FormContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.section`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: none;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: none;
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;


function ContactForm() {
    const [recipient_email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isMailSent, setIsMailSent] = useState(false);
  
    function sendMail() {
      if (recipient_email && subject && message) {
        axios
          .post("http://localhost:5000/send_email", {
            recipient_email,
            subject,
            message,
          })
          .then(() => {
            setIsMailSent(true);
          })
          .catch(() => alert("Oops! Something went wrong."));
        return;
      }
      return alert("Please fill in all fields to continue");
    }
  
    return (
      <DashboardLayout>
        <FormContainer>
          <FormSection>
            <div>
              <section className="bg-white dark:bg-gray-900">
                <div className="py-8 lg:py-16 mx-auto max-w-screen-md">
                <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={-2}
          mt={1}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            Envoyer un mail
          </MDTypography>
        </MDBox>
  
                  <form>
                    <div>
                      <label htmlFor="email">Your Email</label>
                      <Input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="username@gmail.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="subject">Subject</label>
                      <Input
                        type="text"
                        id="subject"
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Let us know how we can help you"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message">Your message</label>
                      <TextArea
                        id="message"
                        rows="6"
                        onChange={(e) => setMessage(e.target.value)}
                      ></TextArea>
                    </div>
                    <MDButton    variant="gradient"
                    color="secondary" 
                    onClick={() => sendMail()}>Envoyer </MDButton>
                    {isMailSent && (
                      <p className="text-green-500">Mail sent successfully!</p>
                    )}
                      <MDButton
                  variant="gradient"
                  color="secondary"
                    onClick={() => window.history.back()}
                >
                    Retour
                </MDButton>
                  </form>
                </div>
              </section>
            </div>
          </FormSection>
        </FormContainer>
      </DashboardLayout>
    );
  }
  

export default ContactForm;