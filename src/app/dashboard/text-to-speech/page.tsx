"use client";

import axios from "axios";
import React, { useState } from "react";
import { Dropdown } from "@/components";

export default function Index() {
  const [storeText, setStoreText] = useState<string>();
  const [audio, setAudio] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [lan, setLan] = useState<string>();

  const GenderOption = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
  ];

  const LanguagueOption = [
    { value: "eng", label: "English" },
    { value: "fr", label: "French" },
    { value: "spa", label: "Spanish" },
  ];

  const handleFunction = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(lan, gender);
    axios
      .post(
        "https://api.edenai.run/v2/audio/text_to_speech",
        {
          providers: "amazon,google,ibm,microsoft",
          language: !lan ? "eng" : lan,
          text: storeText,
          option: !gender ? "MALE" : gender,
          fallback_providers: "",
        },
        {
          headers: {
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTVkNDRkMmYtMDk4ZC00ZTYxLTk3Y2UtODVhYmI4OTcyNWZhIiwidHlwZSI6ImFwaV90b2tlbiJ9.WiiTdKaENJf3WsRwa_4ST16OJbdz3CJzoGkQ0wBBPRQ`,
          },
        }
      )
      .then((res) => {
        const audioUrl = res?.data.microsoft.audio_resource_url;
        setAudio(audioUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(process.env.TOKEN, "hello")

  return (
    <main className="relative flex min-h-screen flex-col items-center px-10 bg-[#333332]">
      <h2 className="md:text-[5em] text-[3em] mr-auto">/Text-to-Speech</h2>
      <hr className="w-full" />
      <section className="w-[100%] h-[80svh] flex flex-col md:flex-row justify-between mt-[5%] md:mt-0">
        <div className="border-2 border-[#757474] rounded h-[50%] md:w-[50%] md:my-auto bg-[#303030]">
          <textarea
            className="w-[100%] h-[100%] bg-transparent px-3 py-5 no-scrollbar"
            onChange={(e) => setStoreText(e.target.value)}
            placeholder="Input text"
            name="text"
            id="text"
          ></textarea>
        </div>
        <div className="h-[50%] md:w-[35%] md:my-auto flex flex-col gap-5 mt-[4rem]">
          <div>
            <Dropdown
              name="Gender"
              options={GenderOption}
              title="Select Gender option"
              onChange={(option) => setGender(option.target.value)}
            />

            <Dropdown
              name="Languague"
              options={LanguagueOption}
              title="Select Languague"
              onChange={(option) => setLan(option.target.value)}
            />
          </div>
          <button
            className="bg-[#454545] rounded py-3 text-2xl"
            onClick={handleFunction}
          >
            Generate Audio
          </button>

          {audio ? (
            <audio className="w-[100%]" src={audio} autoPlay controls />
          ) : null}
        </div>
      </section>
    </main>
  );
}