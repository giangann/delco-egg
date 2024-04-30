import { useState } from "react";

export const Test = () => {
  const [currObj, setCurrObj] = useState<Record<string, any>>({
    user: "an",
    age: 30,
    limit: 5,
    date: "22/09/2001",
  });

  const onClear = (key: string) => {
    // const newObj = { ...currObj };
    // delete newObj[key];
    setCurrObj((prev) => {
      delete prev[key];
      // return { ...prev };
      return prev;
    });
  };
  

  const onClick = () => {
    onClear("date");
    onClear("limit");
  };

  return (
    <div>
      <button onClick={onClick}>change</button>
      {Object.keys(currObj).map((key: string) => (
        <p>
          {key}: {currObj[key]}
        </p>
      ))}
    </div>
  );
};
