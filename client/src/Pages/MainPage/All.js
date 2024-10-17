import AboutUs from "./aboutUs/AboutUs";
import Services from "./services/Services";
import ExampleGenerator from "./examples/exampleGenerator";
import ContactUs from "./contactUs/contactUs";
function All() {
  return (
    <div>
      <Services id="services" />
      <AboutUs id="about" />
      <ExampleGenerator id="examples" />
      <ContactUs />
    </div>
  );
}

export default All;
