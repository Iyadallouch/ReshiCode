import React from "react";
import Examples from "./Examples";

import audit from "../../../images/userpic.png";
const ExampleGenerator = () => {
  return (
    <div id="examples" style={{ textAlign: "center" }}>
      <h1>Our work</h1>

      <Examples
        id="example-0"
        image={audit}
        title={`Test`}
        content={`Our advanced website features live chat to clarify and facilitate programming issues, enhancing the user experience and enabling immediate problem resolution. This service provides effective and flexible technical support, speeding up task completion and increasing customer satisfaction. Thanks to live chat, users receive accurate and prompt answers to their inquiries, improving work efficiency and reducing wasted time.
 Welcome  (title)
Welcome to ReshiCode, where we’re redefining how developers handle coding problems. Our Real-time Collaboration System is planned to bridge the gap between coding errors and solutions through immediate, collaborative support. 

We understand that coding can be complicated and sometimes, having a second set of eyes or a fresh viewpoint can make all the difference. That’s why we’ve created a platform where users can connect with experienced programmers to get real-time help. By creating specialized programming rooms, our users can discuss, debug, and find solutions of coding issues efficiently. 

Our website not only smooths problem-solving but also promotes growth and recognition among the developer society. Programmers can acquire valuable ratings and feedback from peers, helping them build their reputation and improve their skills. 

At ReshiCode, our core task is to encourage a collaborative environment where knowledge is shared, and coding problems are met with collective skillfulness. Join us today and be part of a vibrant community that values collaboration, innovation, and solid learning.

s
e            `}
        alt="same as title"
      />

      <Examples
        id="example-2"
        image={audit}
        title={`Test`}
        content={`test`}
        alt="same as title"
      />
    </div>
  );
};

export default ExampleGenerator;
