import { IAnimalFullResponse } from "@/types";
import { useRouter } from "next/router";
import React from "react";

type PropsType = {
  data: IAnimalFullResponse;
};

const enum ANIMAL_TYPE_STATE {
  True = "True",
  False = "False",
}

export default function DetailsCard({ data }: PropsType): React.JSX.Element {
  const router = useRouter();
  const animalDetails = data.animal;

  return animalDetails ? (
    <div>
      <div>
        <h3>{animalDetails.name}</h3>
        <h4>Details:</h4>
        <ul>
          <li>
            {`Earth Animal: ${
              animalDetails.earthAnimal
                ? ANIMAL_TYPE_STATE.True
                : ANIMAL_TYPE_STATE.False
            }`}
          </li>
          <li>
            {`Earth Insect: ${
              animalDetails.earthInsect
                ? ANIMAL_TYPE_STATE.True
                : ANIMAL_TYPE_STATE.False
            }`}
          </li>
          <li>
            It is avian:{" "}
            {animalDetails.avian
              ? ANIMAL_TYPE_STATE.True
              : ANIMAL_TYPE_STATE.False}
          </li>
          <li>
            It is feline:{" "}
            {animalDetails.feline
              ? ANIMAL_TYPE_STATE.True
              : ANIMAL_TYPE_STATE.False}
          </li>
          <li>
            It is canine:{" "}
            {animalDetails.canine
              ? ANIMAL_TYPE_STATE.True
              : ANIMAL_TYPE_STATE.False}
          </li>
        </ul>
      </div>
      <div>
        <button onClick={() => router.push("/")}>Close</button>
      </div>
    </div>
  ) : (
    <></>
  );
}
