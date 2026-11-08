import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })

    setError('')
    setSuccess('')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const { name, email, password, confirmPassword } = formData

    setError('')
    setSuccess('')

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (password.length < 8) {
      setError('Password must contain at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      setLoading(true)

      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          name,
          email,
          password,
        }
      )

      setSuccess(response.data.message)

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      })

      setTimeout(() => {
        navigate('/')
      }, 1500)

    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Registration failed. Please try again.'
      )

      setSuccess('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F3E9DA] flex items-center justify-center p-4 sm:p-8">

      <div className="w-full max-w-6xl bg-[#FFFCF7] rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Branding Section */}

        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-[#641E32] via-[#72243A] to-[#38252A] text-[#FFFCF7] p-12 relative overflow-hidden">

          <div className="absolute -top-24 -right-24 w-80 h-80 border border-[#D4AF75]/20 rounded-full" />

          <div className="relative z-10">
            <h1 className="font-serif text-5xl text-[#E8CCA0]">
              melo<span className="text-white">.</span>
            </h1>

            <p className="text-sm tracking-[0.3em] uppercase mt-3 text-[#E8CCA0]">
              Meaningful communication
            </p>
          </div>

          <div className="relative z-10">
            <div className="w-16 h-[2px] bg-[#D4AF75] mb-8" />

            <h2 className="font-serif text-5xl leading-tight mb-6">
              Make room<br />
              for meaningful<br />
              connections.
            </h2>

            <p className="text-[#F3E9DA]/75 leading-8 text-sm max-w-sm">
              Create your workspace and discover a more thoughtful
              way to manage your email communication.
            </p>
          </div>

          <p className="relative z-10 text-xs text-[#F3E9DA]/50 tracking-wider">
            © 2026 MELO. ALL RIGHTS RESERVED.
          </p>

        </div>


        {/* Registration Form */}

        <div className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-16">

          <div className="md:hidden mb-8">
            <h1 className="font-serif text-5xl text-[#641E32]">
              melo<span className="text-[#D4AF75]">.</span>
            </h1>
          </div>

          <div className="max-w-md w-full mx-auto">

            <p className="text-xs uppercase tracking-[0.25em] text-[#B08A54] font-semibold mb-4">
              Get started
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl text-[#641E32] mb-4">
              Create account.
            </h2>

            <p className="text-sm text-[#8B7477] leading-7 mb-8">
              Join melo and make every message meaningful.
            </p>


            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}

              <div>
                <label className="block text-sm font-medium text-[#38252A] mb-2">
                  Full name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full bg-[#FAF5F0] border border-[#E5D8C8] rounded-xl px-4 py-3.5 text-sm outline-none transition focus:border-[#B08A54] focus:ring-2 focus:ring-[#D4AF75]/20"
                />
              </div>


              {/* Email */}

              <div>
                <label className="block text-sm font-medium text-[#38252A] mb-2">
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-[#FAF5F0] border border-[#E5D8C8] rounded-xl px-4 py-3.5 text-sm outline-none transition focus:border-[#B08A54] focus:ring-2 focus:ring-[#D4AF75]/20"
                />
              </div>


              {/* Password */}

              <div>
                <label className="block text-sm font-medium text-[#38252A] mb-2">
                  Password
                </label>

                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full bg-[#FAF5F0] border border-[#E5D8C8] rounded-xl px-4 py-3.5 text-sm outline-none transition focus:border-[#B08A54] focus:ring-2 focus:ring-[#D4AF75]/20"
                />
              </div>


              {/* Confirm Password */}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-[#38252A]">
                    Confirm password
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs font-semibold text-[#8B7477] hover:text-[#641E32]"
                  >
                    {showPassword ? 'Hide passwords' : 'Show passwords'}
                  </button>
                </div>

                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full bg-[#FAF5F0] border border-[#E5D8C8] rounded-xl px-4 py-3.5 text-sm outline-none transition focus:border-[#B08A54] focus:ring-2 focus:ring-[#D4AF75]/20"
                />
              </div>


              {/* Error Message */}

              {error && (
                <p role="alert" className="text-sm text-[#A8324A]">
                  {error}
                </p>
              )}


              {/* Success Message */}

              {success && (
                <p role="status" className="text-sm text-green-700">
                  {success}
                </p>
              )}


              {/* Submit Button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#641E32] text-[#FFFCF7] py-4 rounded-xl text-sm font-semibold tracking-wide shadow-lg shadow-[#641E32]/15 hover:bg-[#842D45] hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create my account'}
              </button>

            </form>


            <p className="text-center text-sm text-[#8B7477] mt-8">
              Already have an account?{' '}
              <Link
                to="/"
                className="font-semibold text-[#641E32] hover:text-[#B08A54] transition"
              >
                Sign in
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Register