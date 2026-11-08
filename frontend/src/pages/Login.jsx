import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    try {
      setLoading(true)

      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        }
      )

      // Save the JWT token for this browser session
      sessionStorage.setItem('meloToken', response.data.token)

      // Save the logged-in user's details
      sessionStorage.setItem(
        'meloUser',
        JSON.stringify(response.data.user)
      )

      navigate('/dashboard')

    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Login failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F3E9DA] flex items-center justify-center p-4 sm:p-8">

      <div className="w-full max-w-6xl min-h-[650px] bg-[#FFFCF7] rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Branding Section */}

        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-[#641E32] via-[#72243A] to-[#38252A] text-[#FFFCF7] p-12 relative overflow-hidden">

          <div className="absolute -top-24 -right-24 w-80 h-80 border border-[#D4AF75]/20 rounded-full" />

          <div className="absolute -bottom-32 -left-20 w-96 h-96 border border-[#D4AF75]/20 rounded-full" />

          <div className="relative z-10">
            <h1 className="font-serif text-5xl tracking-wide text-[#E8CCA0]">
              melo<span className="text-[#FFFCF7]">.</span>
            </h1>

            <p className="text-sm tracking-[0.3em] uppercase mt-3 text-[#E8CCA0]">
              Meaningful communication
            </p>
          </div>

          <div className="relative z-10 max-w-md">
            <div className="w-16 h-[2px] bg-[#D4AF75] mb-8" />

            <h2 className="font-serif text-5xl leading-tight mb-6">
              Every message,<br />
              a little more<br />
              meaningful.
            </h2>

            <p className="text-[#F3E9DA]/75 leading-8 text-sm">
              Your communication deserves a space as thoughtful as the
              messages you send. Bring everything together with melo.
            </p>
          </div>

          <p className="relative z-10 text-xs text-[#F3E9DA]/50 tracking-wider">
            © 2026 MELO. ALL RIGHTS RESERVED.
          </p>

        </div>


        {/* Login Section */}

        <div className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-16">

          <div className="md:hidden mb-12">
            <h1 className="font-serif text-5xl text-[#641E32]">
              melo<span className="text-[#D4AF75]">.</span>
            </h1>

            <p className="text-xs tracking-widest uppercase text-[#8B7477] mt-2">
              Meaningful communication
            </p>
          </div>

          <div className="max-w-md w-full mx-auto">

            <p className="text-xs uppercase tracking-[0.25em] text-[#B08A54] font-semibold mb-4">
              Welcome back
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl text-[#641E32] mb-4">
              Sign in.
            </h2>

            <p className="text-sm text-[#8B7477] leading-7 mb-10">
              Enter your details to access your workspace.
            </p>


            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email */}

              <div>
                <label className="block text-sm font-medium text-[#38252A] mb-2">
                  Email address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="name@example.com"
                  className="w-full bg-[#FAF5F0] border border-[#E5D8C8] rounded-xl px-4 py-4 text-sm text-[#38252A] outline-none transition duration-300 focus:border-[#B08A54] focus:ring-2 focus:ring-[#D4AF75]/20"
                />
              </div>


              {/* Password */}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-[#38252A]">
                    Password
                  </label>
                </div>

                <div className="relative">

                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError('')
                    }}
                    placeholder="Enter your password"
                    className="w-full bg-[#FAF5F0] border border-[#E5D8C8] rounded-xl px-4 py-4 pr-20 text-sm text-[#38252A] outline-none transition duration-300 focus:border-[#B08A54] focus:ring-2 focus:ring-[#D4AF75]/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8B7477] hover:text-[#641E32] transition"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>

                </div>
              </div>


              {/* Error Message */}

              {error && (
                <p role="alert" className="text-sm text-[#A8324A]">
                  {error}
                </p>
              )}


              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#641E32] text-[#FFFCF7] py-4 rounded-xl text-sm font-semibold tracking-wide shadow-lg shadow-[#641E32]/15 hover:bg-[#842D45] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in to melo'}
              </button>

            </form>


            {/* Workspace Footer */}

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E9DED2]" />

              <span className="text-xs text-[#B09B91]">
                MELO WORKSPACE
              </span>

              <div className="h-px flex-1 bg-[#E9DED2]" />
            </div>

            <p className="text-center text-xs text-[#A18C85] mt-8">
              A more thoughtful way to communicate.
            </p>

            <p className="text-center text-sm text-[#8B7477] mt-5">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-[#641E32] hover:text-[#B08A54] transition"
              >
                Create one
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login