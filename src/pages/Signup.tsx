import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, User, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept the terms and conditions.");
      return;
    }

    /*
     * Temporary signup logic.
     *
     * Later replace this with:
     *
     * const [signup] = useSignupMutation();
     *
     * from RTK Query.
     */

    console.log({
      name,
      email,
      password,
    });

    /*
     * For now, redirect to login.
     */
    navigate("/login");
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

          {/* CENTER */}

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
              Start managing
              <br />
              your money today.
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
              Create your account and take control of your expenses, budgets and
              financial goals.
            </p>

            {/* FEATURES */}

            <div className="mt-10 space-y-5">
              <Feature
                title="Track every expense"
                description="Keep your daily spending organized."
              />

              <Feature
                title="Set smart budgets"
                description="Create limits for your monthly expenses."
              />

              <Feature
                title="Analyze your spending"
                description="Understand your financial habits with reports."
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

            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
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

            <div className="mb-7">
              <h2
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-900
                "
              >
                Create an account
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Start tracking your expenses in just a few steps.
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

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NAME */}

              <div>
                <label
                  htmlFor="name"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-slate-700
                  "
                >
                  Full name
                </label>

                <div className="relative">
                  <User
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
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    autoComplete="name"
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
                <label
                  htmlFor="password"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-slate-700
                  "
                >
                  Password
                </label>

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
                    placeholder="Create a password"
                    autoComplete="new-password"
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
                      hover:bg-slate-100
                    "
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <p className="mt-1.5 text-xs text-slate-400">
                  Use at least 6 characters.
                </p>
              </div>

              {/* CONFIRM PASSWORD */}

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-slate-700
                  "
                >
                  Confirm password
                </label>

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
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
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
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      rounded-md
                      p-1
                      text-slate-400
                      hover:bg-slate-100
                    "
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* TERMS */}

              <div className="pt-1">
                <label className="flex cursor-pointer items-start gap-2">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(event) => setAgreeTerms(event.target.checked)}
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      rounded
                      border-slate-300
                      text-indigo-600
                      focus:ring-indigo-500
                    "
                  />

                  <span className="text-xs leading-5 text-slate-500">
                    I agree to the{" "}
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>
              </div>

              {/* SIGN UP */}

              <button
                type="submit"
                className="
                  mt-2
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
                Create account
              </button>
            </form>

            {/* LOGIN */}

            <p className="mt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="
                  font-semibold
                  text-indigo-600
                  hover:text-indigo-700
                "
              >
                Sign in
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
