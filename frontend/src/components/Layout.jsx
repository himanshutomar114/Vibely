import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

// Layout component wraps pages with a consistent UI: optional sidebar + navbar + main content
const Layout = ({ children, showSidebar = false }) => {
  return (
    // Ensure the layout takes full height of the screen
    <div className="min-h-screen">
      {/* Horizontal flex layout: Sidebar (optional) + Main content */}
      <div className="flex">
        
        {/* Conditionally render the sidebar if showSidebar is true */}
        {showSidebar && <Sidebar />}

        {/* Main content area (takes remaining space) */}
        <div className="flex-1 flex flex-col">
          
          {/* Always show the top navigation bar */}
          <Navbar />

          {/* Main section for rendering page content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
