import AuthBrandPanel from "../components/AuthBrandPanel";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <main className="h-screen overflow-hidden bg-[#f4f7fb] p-4">
      <div
        className="
          mx-auto
          grid
          h-[calc(100vh-2rem)]
          max-h-[900px]
          min-h-[680px]
          max-w-[1800px]
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-[0_20px_60px_rgba(15,23,42,0.10)]
          lg:grid-cols-[minmax(0,68fr)_minmax(420px,32fr)]
        "
      >
        {/* Fixed left panel */}
        <AuthBrandPanel />

        {/* Login panel */}
        <section
          className="
            flex
            min-w-0
            items-center
            justify-center
            overflow-y-auto
            bg-white
            px-8
            py-8
            xl:px-12
            2xl:px-16
          "
        >
          <div className="w-full max-w-[500px]">
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;