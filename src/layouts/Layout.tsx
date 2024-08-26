import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
      <>
          <header className='bg-header-bg'>
              <div className='mx-auto max-w-6xl py-10'>
                  <h1 className='text-2xl font-medium text-white font-sans'>
                    Product Manager
                  </h1>
              </div>
          </header>
      
          <main className='mt-10 mx-auto max-w-6xl p-10 bg-white shadow rounded-xl flex flex-col items-center'>
            <Outlet />
          </main>

      </>
    )
  }
