import AuthBrandPanel from "../components/AuthBrandPanel";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <main className="h-screen overflow-hidden bg-[#f4f7fb] p-4">
      <div
        className="mx-auto grid h-full max-w-[1800px] 
          overflow-hidden rounded-2xl bg-white
          shadow-[0_20px_60px_rgba(15,23,42,0.10)]
          lg:grid-cols-[68fr_32fr]
        "
      >

        <AuthBrandPanel />

        <section
          className="flex h-full items-center justify-center
            overflow-y-auto bg-white px-8 py-8 xl:px-12 2xl:px-16
          "
        >
          <div className="w-full max-w-[500px]">
            <RegisterForm />
          </div>
        </section>
      </div>
    </main>
  );
}

export default RegisterPage;