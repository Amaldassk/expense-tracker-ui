import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    /*
     * Temporary login logic.
     *
     * Later replace this with your RTK Query
     * login mutation.
     */

    console.log({
      email,
      password,
      rememberMe,
    });

    /*
     * Temporary authentication.
     */
    localStorage.setItem("isAuthenticated", "true");

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        {/* ==========================================
            LEFT SIDE
        ========================================== */}

        <div
          className="
            hidden
            w-1/2
            bg-indigo-600
            lg:flex
            lg:flex-col
            lg:justify-between
            lg:p-12
            xl:p-16
          "
        >
          {/* LOGO */}

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-white/10
                ring-1
                ring-white/20
              "
            >
              <Wallet className="h-6 w-6 text-white" />
            </div>

            <span className="text-xl font-bold text-white">Monetivo</span>
          </div>

          {/* CENTER CONTENT */}

          <div className="max-w-lg">
            <h1
              className="
                text-4xl
                font-bold
                leading-tight
                text-white
                xl:text-5xl
              "
            >
              Take control of
              <br />
              your money.
            </h1>

            <p
              className="
                mt-6
                max-w-md
                text-base
                leading-7
                text-indigo-100
              "
            >
              Track your expenses, manage your budgets and understand where your
              money goes — all in one place.
            </p>

            {/* FEATURES */}

            <div className="mt-10 space-y-4">
              <Feature
                title="Track your expenses"
                description="Keep all your transactions organized."
              />

              <Feature
                title="Manage your budgets"
                description="Set spending limits and stay on track."
              />

              <Feature
                title="Understand your spending"
                description="Get clear reports about your finances."
              />
            </div>
          </div>

          {/* FOOTER */}

          <p className="text-sm text-indigo-200">
            © 2026 Monetivo. All rights reserved.
          </p>
        </div>

        {/* ==========================================
            RIGHT SIDE
        ========================================== */}

        <div
          className="
            flex
            w-full
            items-center
            justify-center
            px-5
            py-10
            sm:px-8
            lg:w-1/2
            lg:px-12
            xl:px-20
          "
        >
          <div className="w-full max-w-md">
            {/* MOBILE LOGO */}

            <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-600
                "
              >
                <Wallet className="h-5 w-5 text-white" />
              </div>

              <span className="text-xl font-bold text-slate-900">Monetivo</span>
            </div>

            {/* HEADING */}

            <div className="mb-8">
              <h2
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-900
                "
              >
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to continue to your dashboard.
              </p>
            </div>

            {/* ERROR */}

            {error && (
              <div
                className="
                  mb-5
                  rounded-lg
                  border
                  border-red-100
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  text-red-600
                "
                role="alert"
              >
                {error}
              </div>
            )}

            {/* FORM */}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-slate-700
                  "
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      h-5
                      w-5
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      py-3
                      pl-11
                      pr-4
                      text-sm
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      hover:border-slate-300
                      focus:border-indigo-500
                      focus:ring-2
                      focus:ring-indigo-100
                    "
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="
                      block
                      text-sm
                      font-medium
                      text-slate-700
                    "
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="
                      text-xs
                      font-medium
                      text-indigo-600
                      hover:text-indigo-700
                    "
                    onClick={() => {
                      console.log("Forgot password");
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      h-5
                      w-5
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      py-3
                      pl-11
                      pr-12
                      text-sm
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      hover:border-slate-300
                      focus:border-indigo-500
                      focus:ring-2
                      focus:ring-indigo-100
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      rounded-md
                      p-1
                      text-slate-400
                      transition
                      hover:bg-slate-100
                      hover:text-slate-600
                    "
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* REMEMBER ME */}

              <div className="flex items-center">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="
                      h-4
                      w-4
                      rounded
                      border-slate-300
                      text-indigo-600
                      focus:ring-indigo-500
                    "
                  />

                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
              </div>

              {/* LOGIN */}

              <button
                type="submit"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-lg
                  bg-indigo-600
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                  focus:ring-offset-2
                  active:bg-indigo-800
                "
              >
                Sign in
              </button>
            </form>

            {/* DIVIDER */}

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs text-slate-400">OR</span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* SIGN UP */}

            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <button
                type="button"
                className="
                  font-semibold
                  text-indigo-600
                  hover:text-indigo-700
                "
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Create account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
 * Feature component
 */

interface FeatureProps {
  title: string;
  description: string;
}

function Feature({ title, description }: FeatureProps) {
  return (
    <div className="flex gap-3">
      <div
        className="
          mt-0.5
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-white/15
        "
      >
        <span className="h-2 w-2 rounded-full bg-white" />
      </div>

      <div>
        <p className="text-sm font-semibold text-white">{title}</p>

        <p className="mt-1 text-sm text-indigo-200">{description}</p>
      </div>
    </div>
  );
}
