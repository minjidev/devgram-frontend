let express = require('express')
let cors = require('cors')
const fetch = (...args) => import ('node-fetch').then(({default: fetch}) => fetch(...args))
const bodyParser = require('body-parser')

/* 내꺼 */
/* const CLIENT_ID = "b3e8e3aa865dfc9d1d08"
const CLIENT_SECRET = "3d49f22546744861cf19ab135e8b66581c5bb432"  */

/* 진수님 */
const CLIENT_ID = "64f8af2227721d1a29ea"
const CLIENT_SECRET = "85c18896e267fae3deda84c5a1bbfb93536793df"

let app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/getAccessToken', async (req, res) => {
  console.log(req.query.code)

  const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;

  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      "Accept": "application/json"
    }
  }).then((response) => {
    return response.json()
  }).then((data) => {
      console.log(data)
      res.json(data)
    })
})

app.get('/getUserData', async function (req, res) {
    req.get('Authorization');
    await fetch('https://api.github.com/user', {
    method: "GET",
    headers: {
      "Authorization": req.get("Authorization")
    }
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    res.json(data)
  })
})

app.listen(4000, function() {
  console.log("CORS server running on port 4000")
})