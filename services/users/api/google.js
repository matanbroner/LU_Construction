const express = require('express');
const router = express.Router({mergeParams: true});
const { google } = require('googleapis')
const passport = require('passport')
//   passport.authenticate('jwt', {session: false}),
router.get('/oauth2',
  (req, res) => {
    
    const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
    const jwt = new google.auth.JWT(
    process.env.GOOGLE_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY,
    scopes
    )
    const view_id = '194968814'

    jwt.authorize((err, response) => {
        google.analytics('v3').data.ga.get(
          {
            auth: jwt,
            ids: 'ga:' + view_id,
            'start-date': '7daysAgo',
            'end-date': 'today',
            metrics: 'ga:pageviews'
          },
          (err, result) => {
            if (err) res.status(404).json({err: 'Error in request: ', err})
            else res.status(200).json({result})
            console.log(err, result)
          }
        )
      })
    
    
  });


  module.exports = router;


