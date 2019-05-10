import React from 'react'
import styles from './AnalyticsPage.css'
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'
var superagent = require('superagent')

;(function(w, d, s, g, js, fjs) {
    g = w.gapi || (w.gapi = {})
    g.analytics = {
      q: [],
      ready: function(cb) {
        this.q.push(cb)
      }
    }
    js = d.createElement(s)
    fjs = d.getElementsByTagName(s)[0]
    js.src = "https://apis.google.com/js/platform.js"
    fjs.parentNode.insertBefore(js, fjs)
    js.onload = function() {
      g.load("analytics")
    }
  })(window, document, "script")

var CLIENT_ID = "49735292631-mvpfg0b05s1kcdvc5bt0erdo9stkd8lc.apps.googleusercontent.com"

const last7days = {
    reportType: "ga",
    query: {
      dimensions: "ga:date",
      metrics: "ga:pageviews",
      "start-date": "7daysAgo",
      "end-date": "yesterday"
    },
    chart: {
      type: "LINE"
    }
  }

  const last30days = {
    reportType: "ga",
    query: {
      dimensions: "ga:date",
      metrics: "ga:pageviews",
      "start-date": "30daysAgo",
      "end-date": "yesterday"
    },
    chart: {
      type: "LINE",
      options: {
        // options for google charts
        // https://google-developers.appspot.com/chart/interactive/docs/gallery
        title: "Last 30 days pageviews"
      }
    }
  }

  let reportRequests = [
    {
      viewId: process.env.GOOGLE_MAPS_API_KEY,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today'
        }
      ],
      metrics: [
        {
          expression: 'ga:sessions'
        }
      ]
    }
  ]

class AnalyticsPage extends React.PureComponent{
    constructor(props){
        super(props)

        this.state = {
            ids: "ga:194968814"
        }
    }

    componentDidMount(){

    }

    render(){
        const views = {
            query: {
              ids: this.state.ids
            }
          }
        return(
            <div>
                Hello
            <GoogleProvider id="graphContainer" clientId={CLIENT_ID}>
                <GoogleDataChart style={{display: 'inline-block',border: '8px solid #eee', padding: 10}} views={views} config={last30days} />
                <GoogleDataChart style={{display: 'inline-block', border: '1px solid #eee', padding: 10}} views={views} config={last7days} />
            </GoogleProvider>
         </div>
        )
    }
}

export default AnalyticsPage