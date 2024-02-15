"use client";

import React, { useState, useEffect } from "react";
import { getAllEmails, EmailsReponse } from "./serverConn";
const EmailList = () => {
  const [emails, setEmails] = useState<EmailsReponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllEmails().then((email) => setEmails(email));
    };

    fetchData().catch((err) => console.log(err));
  }, []);
  return (
    <div className="mx-auto mt-9 max-w-md rounded-md bg-gray-500 p-8 shadow-md">
      <h2 className="mb-4 text-2xl text-white">Lista de Emails</h2>
      <ul className="divide-y divide-gray-400">
        {emails.map((email, index) => (
          <li key={index} className="py-2">
            <span className="text-white">{email.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
