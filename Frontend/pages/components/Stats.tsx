const Stats = (props) => {
    const Data = props.Data;
  return (
    <div className="stats_p">
        <table>
          <tbody>
            <tr>
              <td>Duel rating</td>
              <td>{Data.duelRating}</td>
            </tr>
            <tr>
              <td>Codeforces rating</td>
              <td>{Data.cfRating}</td>
            </tr>
          </tbody>
        </table>
      </div>
  )
}

export default Stats