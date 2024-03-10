import SectionTitle from "./SectionTitle";

const About = ({ minHeight }) => {
  return (
    <section
      className="about wrapper"
      style={minHeight ? { minHeight: "100vh" } : null}
    >
      <SectionTitle title="About" />
      <p>
      Join our decentralized social media platform and experience a new era of transparency and security in online interactions.
      Connect with friends and explore communities while knowing that your data remains in your control on our decentralized network.
      </p>
      <p>
      Earn rewards for your engagement and contributions as we revolutionize social networking with blockchain technology
       on our decentralized platform.
      
      </p>
    </section>
  );
};

export default About;
