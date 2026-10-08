import heroImage from "../../../assets/Loginpage.png";

function AuthBrandPanel() {
  return (
    <section
      className="relative min-h-0 min-w-0 overflow-hidden bg-[#071126]"
    >
      <img
        src={heroImage}
        alt="CodeNest — Build knowledge that stays with you"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </section>
  );
}

export default AuthBrandPanel;