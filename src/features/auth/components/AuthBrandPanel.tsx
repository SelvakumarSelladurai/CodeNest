import heroImage from "../../../assets/Loginpage.png";

function AuthBrandPanel() {
  return (
    <section className="hidden h-full min-h-0 overflow-hidden bg-[#071126] lg:block">
      <img
        src={heroImage}
        alt="CodeNest learning platform"
        className="block h-full w-full object-cover object-center"
      />
    </section>
  );
}

export default AuthBrandPanel;