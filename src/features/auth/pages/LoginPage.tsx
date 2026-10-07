import AuthBrandPanel from "../components/AuthBrandPanel";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <main className="h-screen overflow-hidden bg-[#f4f7fb] p-4">
      <div
        className="mx-auto grid h-full max-w-[1800px] overflow-hidden rounded-2xl bg-white
          shadow-[0_20px_60px_rgba(15,23,42,0.10)] lg:grid-cols-[7fr_3fr]
        ">

        <AuthBrandPanel />

        <section
          className="flex h-full items-center justify-center overflow-hidden px-8 py-8 xl:px-12
        ">
          <div className="w-full max-w-[480px]">
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;