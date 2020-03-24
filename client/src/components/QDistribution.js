import React from 'react'

import { inject, observer } from 'mobx-react'

/**
 * QDistribution chart
 * @param {object} props 
 */
const QDistribution = inject('authStore')(observer((props) => {
    return <div className="q-dist-wrap">
    <label>Q DISTRIBUTION</label>
    <table>
          <thead>
            <tr>
              <th scope="column">Jan</th>
              <th scope="column">Feb</th>
              <th scope="column">Mar</th>
              <th scope="column">Apr</th>
              <th scope="column">May</th>
              <th scope="column">Jun</th>
              <th scope="column">Jul</th>
              <th scope="column">Aug</th>
              <th scope="column">Sep</th>
              <th scope="column">Oct</th>
              <th scope="column">Nov</th>
              <th scope="column">Dec</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="size dark-blue"></div>
              </td>
              <td>
                  <div className="size light-red"></div>
              </td>
              <td>
                  <div className="size grey"></div>
              </td>
              <td>
                  <div className="size dark-blue"></div>
              </td>
              <td>
                <div className="size light-blue"></div>
              </td>
              <td>
                <div className="size grey"></div>
              </td>
              <td>
                <div className="size light-red"></div>
              </td>
              <td>
                <div className="size light-blue"></div>
              </td>
              <td>
                <div className="size dark-red"></div>
              </td>
              <td>
                <div className="size light-red"></div>
              </td>
              <td>
                <div className="size grey"></div>
              </td>
              <td>
                <div className="size dark-blue"></div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="size light-blue"></div>
              </td>
              <td>
                  <div className="size grey"></div>
              </td>
              <td>
                  <div className="size grey"></div>
              </td>
              <td>
                  <div className="size light-blue"></div>
              </td>
              <td>
              <div className="size light-red"></div>
              </td>
              <td>
                <div className="size dark-blue"></div>
              </td>
              <td>
                <div className="size dark-blue"></div>
              </td>
              <td>
                <div className="size dark-red"></div>
              </td>
              <td>
                <div className="size light-red"></div>
              </td>
              <td>
                <div className="size grey"></div>
              </td>
              <td>
                <div className="size light-red"></div>
              </td>
              <td>
                <div className="size light-blue"></div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="size dark-blue"></div>
              </td>
              <td>
                  <div className="size dark-red"></div>
              </td>
              <td>
                  <div className="size light-blue"></div>
              </td>
              <td>
                  <div className="size grey"></div>
              </td>
              <td>
              <div className="size light-blue"></div>
              </td>
              <td>
                <div className="size grey"></div>
              </td>
              <td>
                <div className="size light-red"></div>
              </td>
              <td>
                <div className="size dark-blue"></div>
              </td>
              <td>
                <div className="size grey"></div>
              </td>
              <td>
                <div className="size light-red"></div>
              </td>
              <td>
                <div className="size light-red"></div>
              </td>
              <td>
                <div className="size light-blue"></div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div className="size light-blue"></div>
              </td>
              <td>
                  <div className="size light-red"></div>
              </td>
              <td>
                  <div className="size grey"></div>
              </td>
              <td>
                  <div className="size dark-blue"></div>
              </td>
              <td>
              <div className="size light-blue"></div>
              </td>
              <td>
                <div className="size grey"></div>
              </td>
              <td>
                <div className="size light-red"></div>
              </td>
              <td>
                <div className="size light-blue"></div>
              </td>
              <td>
                <div className="size dark-red"></div>
              </td>
              <td>
                <div className="size light-red"></div>
              </td>
              <td>
                <div className="size grey"></div>
              </td>
              <td>
                <div className="size dark-blue"></div>
              </td>
            </tr>
          </tfoot>
    </table>
  </div>
}))

export default QDistribution
