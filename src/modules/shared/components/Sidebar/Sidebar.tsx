import SidebarItems from '../SidebarItems/SidebarItems'

interface ISidebarProps {
  collapseSidebar: boolean
}

const Sidebar: React.FC<ISidebarProps> = ({ collapseSidebar }) => {
  return (
    <div className={`sidebar ${collapseSidebar ? 'collapse' : ''}`}>
      <div className="sidebar-logo-container">{collapseSidebar ? 'L' : 'Logo'}</div>

      <div className="sidebar-content">
        <div className="sidebar-nav-items">
          <SidebarItems collapseSidebar={collapseSidebar} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
