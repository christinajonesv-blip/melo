import { Link, useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const stats = [
    {
      title: 'Total Emails',
      value: '1,248',
      icon: '✉',
      description: 'Emails processed',
    },
    {
      title: 'Successfully Sent',
      value: '1,186',
      icon: '✓',
      description: 'Emails accepted',
    },
    {
      title: 'Failed Emails',
      value: '62',
      icon: '!',
      description: 'Needs attention',
    },
    {
      title: 'Recipients',
      value: '3,420',
      icon: '♙',
      description: 'Total recipients',
    },
  ]

  const activities = [
    {
      subject: 'November Newsletter',
      recipients: 120,
      date: '08 Nov 2026',
      status: 'Successful',
    },
    {
      subject: 'Project Updates',
      recipients: 45,
      date: '07 Nov 2026',
      status: 'Successful',
    },
    {
      subject: 'Event Invitation',
      recipients: 80,
      date: '06 Nov 2026',
      status: 'Failed',
    },
  ]

  const handleLogout = () => {
    sessionStorage.removeItem('meloToken')
    sessionStorage.removeItem('meloUser')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#F3E9DA] flex flex-col md:flex-row">

      {/* Sidebar */}

      <aside className="w-full md:w-64 bg-[#641E32] text-[#FFFCF7] p-7 flex flex-col">

        <h1 className="font-serif text-4xl text-[#E8CCA0] mb-2">
          melo.
        </h1>

        <p className="text-xs tracking-[0.2em] text-[#E8CCA0]/70 mb-12">
          MEANINGFUL COMMUNICATION
        </p>

        <nav className="space-y-3">

          <Link
            to="/compose"
            className="block bg-[#842D45] text-white px-5 py-3 rounded-xl font-medium hover:bg-[#963951] hover:-translate-y-1 transition duration-300 shadow-lg"
          >
            + Compose Email
          </Link>

          <Link
            to="/compose"
            className="block w-full text-left px-5 py-3 rounded-xl hover:bg-[#842D45] transition"
          >
            ✉ &nbsp; Compose Mail
          </Link>

        </nav>

        <div className="mt-auto pt-12">

          <button
            onClick={handleLogout}
            className="w-full text-left px-5 py-3 rounded-xl text-[#E8CCA0] hover:bg-[#842D45] transition"
          >
            ↪ &nbsp; Logout
          </button>

        </div>

      </aside>


      {/* Main Content */}

      <main className="flex-1 p-6 sm:p-10">

        {/* Header */}

        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#B08A54] font-semibold mb-2">
              Your workspace
            </p>

            <h2 className="font-serif text-4xl text-[#641E32]">
              Dashboard
            </h2>

            <p className="text-sm text-[#8B7477] mt-2">
              Here's what's happening with your emails.
            </p>
          </div>

          <Link
            to="/compose"
            className="inline-block text-center bg-[#641E32] text-white px-7 py-3 rounded-xl font-medium hover:bg-[#842D45] hover:-translate-y-1 transition duration-300 shadow-lg"
          >
            + Compose Email
          </Link>

        </header>


        {/* Statistics */}

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-[#FFFCF7] rounded-2xl p-6 shadow-sm border border-[#E9DED2] hover:-translate-y-1 hover:shadow-lg transition duration-300"
            >

              <div className="flex items-center justify-between mb-5">

                <p className="text-sm text-[#8B7477]">
                  {stat.title}
                </p>

                <span className="w-10 h-10 rounded-xl bg-[#F3E9DA] text-[#641E32] flex items-center justify-center text-xl">
                  {stat.icon}
                </span>

              </div>

              <h3 className="text-3xl font-semibold text-[#641E32]">
                {stat.value}
              </h3>

              <p className="text-xs text-[#A18C85] mt-2">
                {stat.description}
              </p>

            </div>
          ))}

        </section>


        {/* Recent Activity */}

        <section className="bg-[#FFFCF7] rounded-2xl shadow-sm border border-[#E9DED2] overflow-hidden">

          <div className="p-6 sm:p-8">

            <h3 className="font-serif text-2xl text-[#641E32]">
              Recent Activity
            </h3>

            <p className="text-sm text-[#A18C85] mt-1">
              A quick look at your recent campaigns.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-[#FAF5F0] text-xs uppercase tracking-wider text-[#8B7477]">

                <tr>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Recipients</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>

              </thead>

              <tbody>

                {activities.map((activity) => (
                  <tr
                    key={activity.subject}
                    className="border-t border-[#F0E6DC] hover:bg-[#FAF5F0] transition"
                  >

                    <td className="px-6 py-5 text-sm font-medium text-[#38252A] whitespace-nowrap">
                      {activity.subject}
                    </td>

                    <td className="px-6 py-5 text-sm text-[#8B7477]">
                      {activity.recipients}
                    </td>

                    <td className="px-6 py-5 text-sm text-[#8B7477] whitespace-nowrap">
                      {activity.date}
                    </td>

                    <td className="px-6 py-5">

                      <span className={`text-xs font-semibold px-3 py-2 rounded-full ${
                        activity.status === 'Successful'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {activity.status}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* Footer */}

        <footer className="text-center text-xs text-[#A18C85] mt-10">
          Made with care. Every message matters. © 2026 MELO.
        </footer>

      </main>

    </div>
  )
}

export default Dashboard