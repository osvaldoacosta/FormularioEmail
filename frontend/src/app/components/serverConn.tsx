import axios from "axios";
import { cache } from "react";

interface ResponseDataPost {
  email: string;
}

export interface EmailsReponse {
  email: string;
}
const serverAddress = process.env.SERVER_ADDRESS;
export const sendEmailToServer = async (
  email: string,
): Promise<ResponseDataPost> => {
  console.log("Addrss: " + serverAddress);
  try {
    const response = await axios.post("http://localhost/api/user", {
      email,
    });

    return response.data as ResponseDataPost;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending email to server: " + error.message);
    }
    throw error;
  }
};

export const getAllEmails = async (): Promise<EmailsReponse[]> => {
  try {
    const response = await axios.get<EmailsReponse[]>(
      "http://localhost/api/user",
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending email to server: " + error.message);
    }
    throw error;
  }
};
