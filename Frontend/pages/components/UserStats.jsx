const UserStats = (props) => {
  const data = props.data;
  console.log(data);
  return (
    <div className='user'>
        <div className='header_u'>
            {data.name}
        </div>
        <div className='stats_u'>

        </div>
    </div>
  )
}

export default UserStats