import NavigationBar from './navigationBar/NavigationBar';
import AboutUs from './aboutUs/AboutUs';
import Services from './services/Services';
import ExampleGenerator from './examples/exampleGenerator';
import ContactUs from './contactUs/contactUs';
function All() {

  return (
    <div>
      <header >
        <NavigationBar />
      </header>
      <Services id="services"/>
      <AboutUs id="about"/>
      <ExampleGenerator id="examples"/>
      <ContactUs/>
    </div>
  );
}

export default All;
