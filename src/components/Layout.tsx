import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-rows-[4rem_1fr] min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
};


export default Layout;
