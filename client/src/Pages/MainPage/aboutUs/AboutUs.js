import React from "react";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import "./AboutUs.css";

const Section = ({ title, content }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.4, // Adjust the threshold as needed
  });

  const fadeInProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
    transition: "opacity 0.5s, transform 0.5s",
  });

  return (
    <div className="section" ref={ref}>
      <animated.h2 className="section-heading" style={fadeInProps}>
        {title}
      </animated.h2>
      <animated.p className="paragraph" style={fadeInProps}>
        {content}
      </animated.p>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div id="about" className="page-container">
      <Section
        title="Welcome"
        content="Welcome to ReshiCode, where we’re redefining how developers handle coding problems. Our Real-time Collaboration System is planned to bridge the gap between coding errors and solutions through immediate, collaborative support. 

We understand that coding can be complicated and sometimes, having a second set of eyes or a fresh viewpoint can make all the difference. That’s why we’ve created a platform where users can connect with experienced programmers to get real-time help. By creating specialized programming rooms, our users can discuss, debug, and find solutions of coding issues efficiently. 

Our website not only smooths problem-solving but also promotes growth and recognition among the developer society. Programmers can acquire valuable ratings and feedback from peers, helping them build their reputation and improve their skills. 

At ReshiCode, our core task is to encourage a collaborative environment where knowledge is shared, and coding problems are met with collective skillfulness. Join us today and be part of a vibrant community that values collaboration, innovation, and solid learning.
"
      />
      <Section
        title="About us"
        content="We are students in Software Engineering, and we have encountered many difficulties in understanding and solving the required codes in our academic assignments. One of the biggest challenges was finding adequate and appropriate resources that meet our needs and provide accurate solutions in the required programming languages, as most of these resources required monthly subscriptions. In light of these difficulties, our supervisor, Dr. Yazid Ghadi, proposed the idea of creating a website that helps solve programming problems quickly and efficiently without the need for a subscription or payment. This website will be a valuable tool for us and our colleagues in improving our understanding and programming skills, contributing to our academic success and helping us overcome the challenges we face in our studies. We hope that this project will be a great support for students in their educational journey and provide them with the resources they need to achieve success.
"
      />
      <Section
        title="Mission"
        content="We were inspired by the idea of creating our website from our struggle to find quick and effective solutions without a monthly subscription or the need to pay some money to get the required answers. That is why we designed this platform to make it easier for students to ask questions and receive answers quickly. The website allows users to communicate directly with programmers to explain their problems while providing a smart chatbot that they can use for immediate assistance. And many other features to provide a smooth and integrated experience that
                 helps students overcome programming challenges efficiently, quickly, and without paying, which contributes to their academic and professional success."
      />
    </div>
  );
};

export default AboutUs;
