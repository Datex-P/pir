function Sidebar({machines}:any) {
  return (
    <div className='sidebar'>
    {machines && machines.map((el:any, index:number) => (
      <div className='sidebar-inner'>
        <div>
        <span>Machine:{index}</span>
        <div
          className='sidebar-span'
          style={{
            backgroundColor: machines && machines[index]?.status === 'running' ? 'green' :
              machines && machines[index]?.status === 'repaired' ? 'yellow' : 'red'
          }}></div>
          </div>
        <div style={{ display: 'inline-block' }}>Status: {
          machines && machines[index]?.status
        }
        </div>
      </div>
    )
    )
    }
  </div>
  )
}

export default Sidebar