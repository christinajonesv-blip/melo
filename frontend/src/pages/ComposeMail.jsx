import { useState } from 'react'
import * as XLSX from 'xlsx'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ComposeMail() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [recipients, setRecipients] = useState([])
  const [emailInput, setEmailInput] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [sending, setSending] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function addRecipients() {
    const emails = emailInput
      .split(/[,;\s]+/)
      .map(email => email.trim().toLowerCase())
      .filter(Boolean)

    const validEmails = emails.filter(email => emailRegex.test(email))
    const invalidCount = emails.length - validEmails.length

    setRecipients(previous => [
      ...new Set([...previous, ...validEmails])
    ])

    setError(
      invalidCount > 0
        ? `${invalidCount} invalid email address(es) were ignored.`
        : ''
    )

    setEmailInput('')
  }

  function removeRecipient(email) {
    setRecipients(previous =>
      previous.filter(item => item !== email)
    )
  }

  function handleExcelUpload(e) {
    const file = e.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = event => {
      try {
        const workbook = XLSX.read(event.target.result, {
          type: 'array'
        })

        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json(sheet)

        const emails = rows
          .map(row => {
            const key = Object.keys(row).find(
              key => key.trim().toLowerCase() === 'email'
            )

            return key ? String(row[key]).trim().toLowerCase() : ''
          })
          .filter(email => emailRegex.test(email))

        setRecipients(previous => [
          ...new Set([...previous, ...emails])
        ])

        setError('')
        setSuccess(`${emails.length} valid email(s) imported.`)

      } catch {
        setError('Unable to read this Excel file.')
      }

      e.target.value = ''
    }

    reader.readAsArrayBuffer(file)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setError('')
    setSuccess('')

    if (!subject.trim() || !message.trim() || recipients.length === 0) {
      setError('Please complete all fields and add recipients.')
      return
    }

    if (!recipients.every(email => emailRegex.test(email))) {
      setError('Please check your recipient email addresses.')
      return
    }

    const token = sessionStorage.getItem('meloToken')

    if (!token) {
      setError('Please log in again to send your campaign.')
      return
    }

    try {
      setSending(true)

      const response = await axios.post(
        'http://localhost:5000/api/mail/send',
        {
          subject: subject.trim(),
          message: message.trim(),
          recipients
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setSuccess(
        response.data.message || 'Campaign sent successfully!'
      )

      setSubject('')
      setMessage('')
      setRecipients([])

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to send your campaign. Please try again.'
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F3E9DA] flex flex-col md:flex-row">

      {/* Sidebar */}

      <aside className="w-full md:w-64 bg-[#641E32] text-[#FFFCF7] p-7">

        <h1 className="font-serif text-4xl text-[#E8CCA0]">
          melo.
        </h1>

        <p className="text-xs tracking-widest text-[#E8CCA0]/70 mt-2 mb-10">
          MEANINGFUL COMMUNICATION
        </p>

        <nav className="space-y-3">

          <Link
            to="/dashboard"
            className="block px-5 py-3 rounded-xl hover:bg-[#842D45] transition"
          >
            ◈ &nbsp; Dashboard
          </Link>

          <Link
            to="/compose"
            className="block px-5 py-3 rounded-xl bg-[#842D45] text-[#E8CCA0]"
          >
            ✉ &nbsp; Compose Mail
          </Link>

        </nav>

      </aside>

      {/* Main Content */}

      <main className="flex-1 p-6 sm:p-10">

        <header className="mb-10">

          <p className="text-xs uppercase tracking-[0.2em] text-[#B08A54] font-semibold mb-2">
            Campaign workspace
          </p>

          <h2 className="font-serif text-4xl text-[#641E32]">
            Compose Mail
          </h2>

          <p className="text-sm text-[#8B7477] mt-2">
            Create your message and reach your audience.
          </p>

        </header>

        {/* Compose Form */}

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl bg-[#FFFCF7] rounded-2xl p-6 sm:p-10 shadow-sm border border-[#E9DED2] space-y-7"
        >

          {/* Subject */}

          <div>

            <label className="block text-sm font-semibold text-[#38252A] mb-3">
              Email Subject
            </label>

            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Enter your email subject"
              className="w-full bg-[#FAF5F0] border border-[#E5D8C8] rounded-xl p-4 text-sm outline-none focus:border-[#B08A54] focus:ring-2 focus:ring-[#D4AF75]/20 transition"
            />

          </div>

          {/* Recipients */}

          <div>

            <label className="block text-sm font-semibold text-[#38252A] mb-3">
              Recipients
            </label>

            <textarea
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              placeholder="Enter email addresses separated by commas"
              rows="3"
              className="w-full bg-[#FAF5F0] border border-[#E5D8C8] rounded-xl p-4 text-sm outline-none focus:border-[#B08A54] transition resize-none"
            />

            <button
              type="button"
              onClick={addRecipients}
              className="mt-3 text-sm font-semibold text-[#641E32] hover:text-[#B08A54]"
            >
              + Add recipients
            </button>

            <p className="text-xs text-[#A18C85] mt-2">
              {recipients.length} recipient(s) added
            </p>

            <div className="flex flex-wrap gap-2 mt-3">

              {recipients.map(email => (
                <span
                  key={email}
                  className="bg-[#F3E9DA] text-[#641E32] text-xs px-3 py-2 rounded-full flex items-center gap-2"
                >

                  {email}

                  <button
                    type="button"
                    onClick={() => removeRecipient(email)}
                    aria-label={`Remove ${email}`}
                  >
                    ×
                  </button>

                </span>
              ))}

            </div>

          </div>

          {/* Excel Upload */}

          <div className="border-2 border-dashed border-[#D4AF75] rounded-xl p-6 text-center bg-[#FAF5F0]">

            <p className="text-[#641E32] font-semibold mb-2">
              Import recipients from Excel
            </p>

            <p className="text-xs text-[#8B7477] mb-4">
              Upload an .xlsx or .xls file with a column named Email.
            </p>

            <label className="inline-block bg-[#641E32] text-white px-6 py-3 rounded-lg text-sm cursor-pointer hover:bg-[#842D45] transition">

              Choose Excel File

              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleExcelUpload}
                className="hidden"
              />

            </label>

          </div>

          {/* Message */}

          <div>

            <label className="block text-sm font-semibold text-[#38252A] mb-3">
              Email Body
            </label>

            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Write your email message here..."
              rows="9"
              className="w-full bg-[#FAF5F0] border border-[#E5D8C8] rounded-xl p-4 text-sm outline-none focus:border-[#B08A54] transition resize-y"
            />

          </div>

          {/* Feedback */}

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="text-sm text-green-700">
              {success}
            </p>
          )}

          {/* Submit */}

          <div className="flex justify-end">

            <button
              type="submit"
              disabled={sending}
              className="bg-[#641E32] text-white px-9 py-4 rounded-xl font-semibold text-sm hover:bg-[#842D45] hover:-translate-y-1 transition duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send Campaign →'}
            </button>

          </div>

        </form>

      </main>

    </div>
  )
}

export default ComposeMail;